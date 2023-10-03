const { WebSocket, WebSocketServer } = require('ws');
const http = require('http');
const uuidv4 = require('uuid').v4;
const socketIo = require("socket.io");
import { Clients } from './types';
import {userJoin, userLeave, getUsers} from './users';

// Starting the http server and the WebSocket server.
const server = http.createServer();
// const wsServer = new WebSocketServer({ server });
const port = 8000;
const io = socketIo(server);

let image: any, userRoom: string;

server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});

// track of all clients joined
// let clients : Clients[];
const clients: any = {};

io.on("connection", (socket: any) => {
  socket.on("user-joined", (data: any) => {
    const { roomId, userId, userName, host, presenter } = data;
    userRoom = roomId;
    const user = userJoin(socket.id, userName, roomId, host, presenter);
    const roomUsers = getUsers(user.room);
    socket.join(user.room);
    socket.emit("message", {
      message: "Welcome to ChatRoom",
    });
    socket.broadcast.to(user.room).emit("message", {
      message: `${user.userName} has joined`,
    });

    io.to(user.room).emit("users", roomUsers);
    io.to(user.room).emit("canvasImage", image);
  });

  socket.on("drawing", (data: any) => {
    image = data;
    socket.broadcast.to(userRoom).emit("canvasImage", image);
  });

  socket.on("disconnect", () => {
    const userLeaves = userLeave(socket.id);
    const roomUsers = getUsers(userRoom);

    if (userLeaves) {
      io.to(userLeaves.room).emit("message", {
        message: `${userLeaves.userName} left the chat`,
      });
      io.to(userLeaves.room).emit("users", roomUsers);
    }
  });
});