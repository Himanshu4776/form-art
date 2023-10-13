import { Server } from "socket.io";
import { DrawLine } from "./types";
const express = require('express');
const http = require('http');
const uuidv4 = require('uuid').v4;
const app = express();
// Starting the http server and the WebSocket server.
const server = http.createServer(app);
// const wsServer = new WebSocketServer({ server });
const port = 8000;

const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

// let image: any, userRoom: string;

server.listen(port, () => {
  console.log(`✅ WebSocket server is running on port ${port}`);
});

// track of all clients joined
// let clients : Clients[];
const clients: any = {};

// io.on("connection", (socket: any) => {
//   socket.on("user-joined", (data: any) => {
//     const { roomId, userId, userName, host, presenter } = data;
//     userRoom = roomId;
//     const user = userJoin(socket.id, userName, roomId, host, presenter);
//     const roomUsers = getUsers(user.room);
//     socket.join(user.room);
//     socket.emit("message", {
//       message: "Welcome to ChatRoom",
//     });
//     socket.broadcast.to(user.room).emit("message", {
//       message: `${user.userName} has joined`,
//     });

//     io.to(user.room).emit("users", roomUsers);
//     io.to(user.room).emit("canvasImage", image);
//   });

//   socket.on("drawing", (data: any) => {
//     image = data;
//     socket.broadcast.to(userRoom).emit("canvasImage", image);
//   });

//   socket.on("disconnect", () => {
//     const userLeaves = userLeave(socket.id);
//     const roomUsers = getUsers(userRoom);

//     if (userLeaves) {
//       io.to(userLeaves.room).emit("message", {
//         message: `${userLeaves.userName} left the chat`,
//       });
//       io.to(userLeaves.room).emit("users", roomUsers);
//     }
//   });
// });

let count = 0;

io.on('connection', (socket) => {
  socket.on('draw', ({previousPoint, currentPoint, lineColor, selectedLineWidth}: DrawLine) => {
    console.log(count+1,previousPoint, currentPoint, lineColor, selectedLineWidth);
    count += 1;
    socket.broadcast.emit('draw', {previousPoint, currentPoint, lineColor, selectedLineWidth});
  })

  socket.on('clean', () => {
    console.log('clear window');
    socket.broadcast.emit('clean');
  })
})