const { WebSocket, WebSocketServer } = require('ws');
const http = require('http');
const uuidv4 = require('uuid').v4;
import { Clients } from './types';

// Starting the http server and the WebSocket server.
const server = http.createServer();
const wsServer = new WebSocketServer({ server });
const port = 8000;
server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});

// track of all clients joined
// let clients : Clients[];
const clients: any = {};

wsServer.on('connection', function(connection: any) {
  const userId = uuidv4();
  
  clients[userId] = connection;
  console.log(`userid ${userId} is connected to server!!!`);
  
}) 