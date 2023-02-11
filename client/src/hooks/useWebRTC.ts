import { useCallback, useEffect, useRef, Ref } from "react";
import { ClientsType, User } from "../interfaces";
import { useStateWithCallback } from "./useStateWithCallback";
import { ACTIONS } from "../actions";
import { socketInit } from "../sockets";
import { Socket } from "socket.io-client";
import { freeice } from "../constants/freeice";

type RoomID = string | undefined;

export const useWebRTC = (roomId: RoomID, user: User | null) => {
  const [clients, setClients] = useStateWithCallback<ClientsType[]>([]);

  const audioElements: Ref<{ [key: string]: HTMLAudioElement }> = useRef({});
  const connections: Ref<{ [key: string]: RTCPeerConnection }> = useRef({});
  const socket: Ref<Socket | null> = useRef(null);
  const localMediaStream: Ref<MediaStream | null> = useRef(null);
  const clientsRef: Ref<ClientsType[] | null> = useRef(null);

  const addClient = useCallback(
    (newClient: ClientsType, cb: () => void) => {
      const existClient = clients.find((client) => client.id === newClient.id);
      if (!existClient) {
        setClients((prev) => [...prev, newClient], cb);
      }
    },
    [clients, setClients]
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    clientsRef.current = clients;
  }, [clients]);

  useEffect(() => {
    const init = async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      socket.current = socketInit();

      // important functions
      const handleSetMute = async (mute: boolean, userId: string) => {
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
      };

      const handleNewPeer = async ({
        peerId,
        createOffer,
        user: remoteUser,
      }: {
        peerId: string;
        createOffer: any;
        user: ClientsType;
      }) => {
        if (connections.current) {
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
            if (socket.current)
              socket.current.emit(ACTIONS.RELAY_ICE, {
                peerId,
                icecandidate: event.candidate,
              });
          };

          // Handle on track event on this connection
          connections.current[peerId].ontrack = ({
            streams: [remoteStream],
          }) => {
            addClient({ ...remoteUser, muted: true }, () => {
              // get current users mute info
              if (clientsRef.current && user) {
                const currentUser = clientsRef.current.find(
                  (client) => client.id === user.id
                );
                if (currentUser) {
                  if (socket.current)
                    socket.current.emit(ACTIONS.MUTE_INFO, {
                      userId: user?.id,
                      roomId,
                      isMute: currentUser.muted,
                    });
                }
              }
              if (audioElements.current && remoteUser.id) {
                if (audioElements.current[remoteUser?.id]) {
                  audioElements.current[remoteUser?.id].srcObject =
                    remoteStream;
                } else {
                  let settled = false;
                  const interval = setInterval(() => {
                    if (audioElements.current && remoteUser.id) {
                      if (audioElements.current[remoteUser.id]) {
                        audioElements.current[remoteUser.id].srcObject =
                          remoteStream;
                        settled = true;
                      }
                    }

                    if (settled) {
                      clearInterval(interval);
                    }
                  }, 300);
                }
              }
            });
          };

          // Add connection to peer connections track
          if (localMediaStream.current) {
            localMediaStream.current.getTracks().forEach((track) => {
              if (connections.current && localMediaStream.current)
                connections.current[peerId].addTrack(
                  track,
                  localMediaStream.current
                );
            });
          }

          // Create an offer if required
          if (createOffer) {
            const offer = await connections.current[peerId].createOffer();

            // Set as local description
            await connections.current[peerId].setLocalDescription(offer);

            // send offer to the server
            if (socket.current)
              socket.current.emit(ACTIONS.RELAY_SDP, {
                peerId,
                sessionDescription: offer,
              });
          }
        }
      };

      const handleRemovePeer = async ({
        peerId,
        userId,
      }: {
        peerId: string;
        userId: string;
      }) => {
        // Correction: peerID to peerId
        if (connections.current && audioElements.current) {
          if (connections.current[peerId]) {
            connections.current[peerId].close();
          }

          delete connections.current[peerId];
          delete audioElements.current[peerId];
          setClients((list) => list.filter((c) => c.id !== userId));
        }
      };

      const handleIceCandidate = async ({
        peerId,
        icecandidate,
      }: {
        peerId: string;
        icecandidate: any;
      }) => {
        if (icecandidate && connections.current)
          connections.current[peerId].addIceCandidate(icecandidate);
      };

      const setRemoteMedia = async ({
        peerId,
        sessionDescription: remoteSessionDescription,
      }: {
        peerId: string;
        sessionDescription: any;
      }) => {
        if (connections.current) {
          connections.current[peerId].setRemoteDescription(
            new RTCSessionDescription(remoteSessionDescription)
          );

          // If session descrition is offer then create an answer
          if (remoteSessionDescription.type === "offer") {
            const connection = connections.current[peerId];

            const answer = await connection.createAnswer();
            connection.setLocalDescription(answer);
            if (socket.current)
              socket.current.emit(ACTIONS.RELAY_SDP, {
                peerId,
                sessionDescription: answer,
              });
          }
        }
      };

      const captureMedia = async () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        localMediaStream.current = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        // Start capturing local audio stream.
        await captureMedia();

        if (user) {
          addClient({ ...user, muted: true }, () => {
            if (audioElements.current && user.id) {
              const localElement = audioElements.current[user.id];
              if (localElement) {
                localElement.muted = true;
                localElement.srcObject = localMediaStream.current;
              }
            }
          });
        }

        // muted info
        socket.current?.on(
          ACTIONS.MUTE_INFO,
          ({ userId, isMute }: { userId: string; isMute: boolean }) => {
            handleSetMute(isMute, userId);
          }
        );

        // sockets events
        // add new peer
        socket.current?.on(ACTIONS.ADD_PEER, handleNewPeer);
        // remove peer
        socket.current?.on(ACTIONS.REMOVE_PEER, handleRemovePeer);
        // ice candidates
        socket.current?.on(ACTIONS.ICE_CANDIDATE, handleIceCandidate);
        // set remote description
        socket.current?.on(ACTIONS.SESSION_DESCRIPTION, setRemoteMedia);

        socket.current?.on(ACTIONS.MUTE, ({ peerId, userId }) => {
          handleSetMute(true, userId);
        });
        socket.current?.on(ACTIONS.UNMUTE, ({ peerId, userId }) => {
          handleSetMute(false, userId);
        });
        socket.current?.emit(ACTIONS.JOIN, {
          roomId,
          user,
        });
      };
    };
    init();
    return () => {
      if (localMediaStream.current)
        localMediaStream.current.getTracks().forEach((track) => track.stop());
      if (socket.current) {
        socket.current.emit(ACTIONS.LEAVE, { roomId });
        socket.current.off(ACTIONS.ADD_PEER);
        socket.current.off(ACTIONS.REMOVE_PEER);
        socket.current.off(ACTIONS.ICE_CANDIDATE);
        socket.current.off(ACTIONS.SESSION_DESCRIPTION);
        socket.current.off(ACTIONS.MUTE);
        socket.current.off(ACTIONS.UNMUTE);
      }
      for (const peerId in connections.current) {
        connections.current[peerId].close();
        delete connections.current[peerId];
        if (audioElements.current) delete audioElements.current[peerId];
      }
    };
  }, []);

  const provideRef = (instace: any, userId: string) => {
    if (audioElements.current) audioElements.current[userId] = instace;
  };

  const handleMute = (isMute: boolean, userId: string) => {
    let settled = false;

    if (userId === user?.id) {
      const interval = setInterval(() => {
        if (localMediaStream.current) {
          localMediaStream.current.getTracks()[0].enabled = !isMute;
          if (socket.current) {
            if (isMute) {
              socket.current.emit(ACTIONS.MUTE, {
                roomId,
                userId: user?.id,
              });
            } else {
              socket.current.emit(ACTIONS.UNMUTE, {
                roomId,
                userId: user?.id,
              });
            }
          }
          settled = true;
        }
        if (settled) {
          clearInterval(interval);
        }
      }, 200);
    }
  };

  return {
    clients,
    provideRef,
    handleMute,
  };
};
