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
  socket.on('join room', (userName, roomName, role, callback) => {
    console.log('user joining room');
    const { updatedHistory, userId, roomId } = joinRoom(
      server_history,
      socket,
      io,
      roomName,
      role,
      userName
    );
    server_history = updatedHistory;
    callback({
      data: {
        userId,
        roomId
      }
    });
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (userId, userName, roomId, msgObj) => {
    console.log('message: ' + msgObj);
    server_history = postMessage(
      server_history,
      socket,
      io,
      msgObj,
      userId,
      userName,
      roomId
    );
  });
  socket.on('block user', (userId, blockedUserId, roomId) => {});
});

server.listen(PORT, () => {
  console.log(`server running at PORT:${PORT}`);
});
