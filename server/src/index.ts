import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { joinRoom, blockUser } from './users';
import { postMessage } from './chat';
import cors from 'cors';
import {
  ChatMessageWithIds,
  ServerHistory,
  UserRole
} from './utils/global.types';
import { kickOutUser } from './users/kickOut';
import { logout } from './users/logout';

const app = express();
app.use(cors());
const server = createServer(app);
const io = new Server(server, {
  //@ts-ignore
  cors: '*'
});
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

let server_history = {};

io.on('connection', (socket) => {
  socket.on(
    'join room',
    (userName: string, roomName: string, role: UserRole, callback) => {
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
    }
  );
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on(
    'chat message',
    (
      userId: string,
      userName: string,
      roomId: string,
      msgObj: ChatMessageWithIds
    ) => {
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
    }
  );
  socket.on('rejoin rooms', (roomIds: string[]) => {
    roomIds.forEach((roomId) => {
      socket.join(roomId); // Rejoin the rooms
    });
  });
  socket.on('logout', (roomId: string, userId: string) => {
    server_history = logout(userId, roomId, socket, io, server_history);
  });
  socket.on('get room data', (roomId: string, callback) => {
    const roomData = (server_history as ServerHistory)?.[roomId] || {};
    if (roomData.roomName) {
      callback({ [roomId]: roomData });
    } else {
      callback({});
    }
  });
  socket.on(
    'block user',
    (userId: string, blockedUserId: string, roomId: string) => {
      server_history = blockUser(userId, blockedUserId, roomId, server_history);
    }
  );
  socket.on('kick out', (userId: string, roomId: string) => {
    server_history = kickOutUser(userId, roomId, server_history, socket, io);
  });
});

server.listen(PORT, () => {
  console.log(`server running at PORT:${PORT}`);
});
