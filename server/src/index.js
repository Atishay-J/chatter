import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { joinRoom } from './users';
import { postMessage } from './chat';
import cors from 'cors';

const app = express();
app.use(cors());
const server = createServer(app);
const io = new Server(server, {
  cors: '*'
});
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

let server_history = {};

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('join room', (userName, roomName, role) => {
    console.log('user joining room');
    server_history = joinRoom(server_history, socket, roomName, role, userName);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (userName, roomName, msgObj) => {
    console.log('message: ' + msgObj);
    server_history = postMessage(
      server_history,
      socket,
      msgObj,
      userName,
      roomName
    );
  });
});

server.listen(PORT, () => {
  console.log(`server running at PORT:${PORT}`);
});
