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
    origin: '*'
  }
});

server.listen(port, () => {
  console.log(`✅ WebSocket server is running on port ${port}`);
});

// track of all clients joined
// let clients : Clients[];
const clients: any = {};


io.on('connection', (socket) => {
  socket.on('draw', ({previousPoint, currentPoint, lineColor, selectedLineWidth}: DrawLine) => {
    // console.log(count+1,previousPoint, currentPoint, lineColor, selectedLineWidth);
    socket.broadcast.emit('draw', {previousPoint, currentPoint, lineColor, selectedLineWidth});
  })

  socket.on('clean', () => {
    // console.log('clear window');
    socket.broadcast.emit('clean');
  })
})