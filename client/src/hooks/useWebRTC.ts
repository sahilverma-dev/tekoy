import { useEffect, useRef, useCallback } from "react";
import { User } from "../interfaces";
import { useStateWithCallback } from "./useStateWithCallback";
import { Socket } from "socket.io-client";
import { socketInit } from "../sockets";
import { SOCKET_ACTIONS } from "../constants/socket-actions";

type Ref = {
  [key: string]: any;
};

interface Props {
  clients: User[];
  provideRef: (instance: any, userID: string) => void;
}

export const useWebRTC = (
  user: User | null,
  roomID: string | undefined
): Props => {
  const [clients, setClients] = useStateWithCallback([]);
  const audioElementsRef = useRef<Ref>({});
  const localMediaStreams = useRef<MediaStream | null>(null);
  const socket = useRef<Socket | null>(null);

  const addNewClient = useCallback(
    (newClient: User, cb: any) => {
      const clientExist = clients.find(
        (client: User) => client.id === newClient.id
      );
      if (!clientExist) {
        setClients((prevClients: User[]) => [...prevClients, newClient], cb);
      }
    },
    [clients, setClients]
  );

  useEffect(() => {
    socket.current = socketInit();
  }, []);

  useEffect(() => {
    const startCapture = async () => {
      localMediaStreams.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
    };

    startCapture().then(() => {
      if (user) {
        addNewClient(user, () => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const localElement = audioElementsRef.current[user.id];
          if (localElement) {
            localElement.muted = true;
            localElement.srcObject = localMediaStreams.current;
          }

          // socket emit join
          console.log("socket connect");
          socket.current?.emit(SOCKET_ACTIONS.JOIN, {});
        });
      }
    });
  }, [addNewClient, user]);

  const provideRef = (instance: any, userID: string) => {
    audioElementsRef.current[userID] = instance;
  };

  return { clients, provideRef };
};
