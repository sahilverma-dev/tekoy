import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import "colors";
import { Server as SocketIOServer } from "socket.io";
import { connectDB } from "./config/db";

// importing routes
import { userRoute } from "./routes/userRoute";
import { roomRoute } from "./routes/roomRoute";
import { SOCKET_ACTIONS } from "./constants/socket-actions";

// configure dotenv
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors({ origin: process.env.ORIGIN || "*" }));
app.use(express.json());

const PORT = process.env.PORT || 4000;

// connecting database
connectDB();

// using routes
app.get("/", (req, res) => {
  res.send("listening");
});
app.use("/api/v1/user", userRoute);
app.use("/api/v1/rooms", roomRoute);
console.clear();

// sockets
const socketUserMapping: any = {};

io.on("connection", (socket) => {
  // console.log(socket.id.bgCyan);
  socket.on(SOCKET_ACTIONS.JOIN, ({ roomId, user }) => {
    console.log("joined");
    socketUserMapping[socket.id] = user;
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);

    console.log(clients);

    clients.forEach((clientID) => {
      io.to(clientID).emit(SOCKET_ACTIONS.ADD_PEER, {});
    });

    socket.emit(SOCKET_ACTIONS.ADD_PEER, {});
    socket.join(roomId);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on the port ${PORT}`.green);
});
