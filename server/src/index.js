import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { addUserToRoom } from './utils';

const app = express();
const server = createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

let server_history = {};

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('join room', (name, roomName, role) => {
    const oldRoomData = server_history[roomName] || {};
    const userInRoom = addUserToRoom(roomName, name, role, oldRoomData);
    server_history = { ...server_history, ...userInRoom };
    socket.emit('user joined', 'sdfdfdfsdf', server_history);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    server_history.push(msg);
  });
});

server.listen(PORT, () => {
  console.log(`server running at PORT:${PORT}`);
});
