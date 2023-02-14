import { useCallback, useRef, useEffect } from "react";
import { ClientType, User } from "../interfaces";
import { useStateWithCallback } from "./useStateWithCallback";
import { Socket, io } from "socket.io-client";
import { ACTIONS } from "../actions";
import { freeice } from "../constants/freeice";

export const useWebRTC = (user: User | null, roomID: string | undefined) => {
  const [clients, setClients] = useStateWithCallback<ClientType[]>([]);
  const audioElements = useRef<{ [key: string]: HTMLAudioElement }>({});
  const connections = useRef<{ [key: string]: RTCPeerConnection }>({});
  const socketRef = useRef<Socket | null>(null);
  const localMediaStream = useRef<MediaStream | null>(null);
  const clientsRef = useRef<ClientType[] | null>(null);

  const addNewClient = useCallback(
    (newClient: ClientType, cb: () => void) => {
      const lookingFor = clients.find((client) => client.id === newClient.id);

      if (lookingFor === undefined) {
        setClients((existingClients) => [...existingClients, newClient], cb);
      }
    },
    [clients, setClients]
  );

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_URL);
    socketRef.current = socket;
  }, []);

  useEffect(() => {
    const initChat = async () => {
      await captureMedia();
      if (user)
        addNewClient({ ...user, muted: true }, () => {
          if (user.id) {
            const localElement = audioElements.current[user.id];
            if (localElement) {
              localElement.volume = 0;
              localElement.srcObject = localMediaStream.current;
            }
          }
        });
      if (socketRef.current) {
        socketRef.current.on(ACTIONS.MUTE_INFO, ({ userId, isMute }) => {
          handleSetMute(isMute, userId);
        });

        socketRef.current.on(ACTIONS.ADD_PEER, handleNewPeer);
        socketRef.current.on(ACTIONS.REMOVE_PEER, handleRemovePeer);
        socketRef.current.on(ACTIONS.ICE_CANDIDATE, handleIceCandidate);
        socketRef.current.on(ACTIONS.SESSION_DESCRIPTION, setRemoteMedia);
        socketRef.current.on(ACTIONS.MUTE, ({ peerId, userId }) => {
          handleSetMute(true, userId);
        });
        socketRef.current.on(ACTIONS.UNMUTE, ({ peerId, userId }) => {
          handleSetMute(false, userId);
        });
        socketRef.current.emit(ACTIONS.JOIN, {
          roomID,
          user,
        });
      }

      async function captureMedia() {
        // Start capturing local audio stream.
        localMediaStream.current = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
      }
      async function handleNewPeer({
        peerId,
        createOffer,
        user: remoteUser,
      }: any) {
        if (peerId in connections.current) {
          return console.warn(
            `You are already connected with ${peerId} (${user?.name})`
          );
        }

        // Store it to connections
        connections.current[peerId] = new RTCPeerConnection({
          iceServers: freeice.map((server) => {
            return { urls: `stun:${server}` };
          }),
        });

        // Handle new ice candidate on this peer connection
        connections.current[peerId].onicecandidate = (event) => {
          if (socketRef.current)
            socketRef.current.emit(ACTIONS.RELAY_ICE, {
              peerId,
              icecandidate: event.candidate,
            });
        };

        // Handle on track event on this connection
        connections.current[peerId].ontrack = ({ streams: [remoteStream] }) => {
          addNewClient({ ...remoteUser, muted: true }, () => {
            // get current users mute info
            if (clientsRef.current) {
              const currentUser = clientsRef.current.find(
                (client) => client.id === user?.id
              );
              if (currentUser && socketRef.current) {
                socketRef.current.emit(ACTIONS.MUTE_INFO, {
                  userId: user?.id,
                  roomID,
                  isMute: currentUser.muted,
                });
              }
            }
            if (audioElements.current[remoteUser.id]) {
              audioElements.current[remoteUser.id].srcObject = remoteStream;
            } else {
              let settled = false;
              const interval = setInterval(() => {
                if (audioElements.current[remoteUser.id]) {
                  audioElements.current[remoteUser.id].srcObject = remoteStream;
                  settled = true;
                }

                if (settled) {
                  clearInterval(interval);
                }
              }, 300);
            }
          });
        };

        // Add connection to peer connections track
        if (localMediaStream.current)
          localMediaStream.current.getTracks().forEach((track) => {
            if (localMediaStream.current)
              connections.current[peerId].addTrack(
                track,
                localMediaStream.current
              );
          });

        // Create an offer if required
        if (createOffer) {
          const offer = await connections.current[peerId].createOffer();

          // Set as local description
          await connections.current[peerId].setLocalDescription(offer);

          // send offer to the server
          if (socketRef.current)
            socketRef.current.emit(ACTIONS.RELAY_SDP, {
              peerId,
              sessionDescription: offer,
            });
        }
      }
      async function handleRemovePeer({ peerId, userId }: any) {
        // Correction: peerID to peerId
        if (connections.current[peerId]) {
          connections.current[peerId].close();
        }

        delete connections.current[peerId];
        delete audioElements.current[peerId];
        setClients((list) => list.filter((c) => c.id !== userId));
      }
      async function handleIceCandidate({ peerId, icecandidate }: any) {
        if (icecandidate) {
          connections.current[peerId].addIceCandidate(icecandidate);
        }
      }
      async function setRemoteMedia({
        peerId,
        sessionDescription: remoteSessionDescription,
      }: any) {
        connections.current[peerId].setRemoteDescription(
          new RTCSessionDescription(remoteSessionDescription)
        );

        // If session description is offer then create an answer
        if (remoteSessionDescription.type === "offer") {
          const connection = connections.current[peerId];

          const answer = await connection.createAnswer();
          connection.setLocalDescription(answer);

          if (socketRef.current)
            socketRef.current.emit(ACTIONS.RELAY_SDP, {
              peerId,
              sessionDescription: answer,
            });
        }
      }
      async function handleSetMute(mute: boolean, userId: string) {
        if (clientsRef.current) {
          const clientIdx = clientsRef.current
            .map((client) => client.id)
            .indexOf(userId);
          const allConnectedClients = JSON.parse(
            JSON.stringify(clientsRef.current)
          );
          if (clientIdx > -1) {
            allConnectedClients[clientIdx].muted = mute;
            setClients(allConnectedClients);
          }
        }
      }
    };

    initChat();
    return () => {
      if (localMediaStream.current)
        localMediaStream.current.getTracks().forEach((track) => track.stop());
      for (const peerId in connections.current) {
        connections.current[peerId].close();
        delete connections.current[peerId];
        delete audioElements.current[peerId];
      }
      if (socketRef.current) {
        socketRef.current.emit(ACTIONS.LEAVE, { roomID });
        socketRef.current.off(ACTIONS.ADD_PEER);
        socketRef.current.off(ACTIONS.REMOVE_PEER);
        socketRef.current.off(ACTIONS.ICE_CANDIDATE);
        socketRef.current.off(ACTIONS.SESSION_DESCRIPTION);
        socketRef.current.off(ACTIONS.MUTE);
        socketRef.current.off(ACTIONS.UNMUTE);
      }
    };
  }, [socketRef]);

  const provideRef = (instance: HTMLAudioElement, userId: string) => {
    if (audioElements.current) audioElements.current[userId] = instance;
  };

  const handleMute = (isMute: boolean, userId: string) => {
    let settled = false;

    if (userId === user?.id) {
      const interval = setInterval(() => {
        if (localMediaStream.current) {
          localMediaStream.current.getTracks()[0].enabled = !isMute;
          if (isMute) {
            if (socketRef.current)
              socketRef.current.emit(ACTIONS.MUTE, {
                roomID,
                userId: user?.id,
              });
          } else {
            if (socketRef.current)
              socketRef.current.emit(ACTIONS.UNMUTE, {
                roomID,
                userId: user?.id,
              });
          }
          settled = true;
        }
        if (settled) {
          clearInterval(interval);
        }
      }, 200);
    }
  };

  useEffect(() => {
    if (clientsRef.current) clientsRef.current = clients;
  }, [clients]);

  return {
    clients,
    provideRef,
    handleMute,
  };
};
