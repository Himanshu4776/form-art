import { Server } from "socket.io";
import { DrawLine } from "./types";
const express = require('express');
const http = require('http');
const uuidv4 = require('uuid').v4;
const app = express();
// Starting the http server and the WebSocket server.
const server = http.createServer(app);

const port = 8000;

const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  },
  allowEIO3: true,
  transports: ['polling', 'websocket']
});

server.listen(port, () => {
  console.log(`✅ WebSocket server is running on port ${port}`);
});

// track of all clients joined
// let clients : Clients[];
const clients: any = {};

io.on('connection', (socket) => {
  socket.on('join-room', ({ roomId, userName, isHost }) => {
    socket.join(roomId);
    console.log(`User ${userName} joined room ${roomId}`);
  });

  socket.on('draw', ({ previousPoint, currentPoint, lineColor, selectedLineWidth, roomId }) => {
    
    socket.to(roomId).emit('draw', { previousPoint, currentPoint, lineColor, selectedLineWidth, roomId });
    console.log("draw, ", socket.to(roomId).emit('draw', { previousPoint, currentPoint, lineColor, selectedLineWidth, roomId }));
  });

  socket.on('clean', (roomId) => {
    socket.to(roomId).emit('clean');
  });
});


// })