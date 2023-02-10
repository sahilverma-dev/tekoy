import { io } from "socket.io-client";

export const socketInit = () =>
  io("http://localhost:5000", {
    "force new connection": true,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websockets"],
  });
