import { Server, Socket } from 'socket.io';
import { ServerHistory, UserData } from '../utils/global.types';

export const kickOutUser = (
  userId: string,
  roomId: string,
  server_history: ServerHistory,
  socket: Socket,
  io: Server
) => {
  const currentRoom = server_history?.[roomId];
  const { currentParticipant, otherParticipants } =
    currentRoom.participants.reduce(
      (
        acc: { currentParticipant?: UserData; otherParticipants?: UserData[] },
        cur
      ) => {
        if (cur.userId === userId) {
          return { currentParticipant: cur, ...acc };
        } else {
          return {
            ...acc,
            otherParticipants: [...(acc?.otherParticipants || []), cur]
          };
        }
      },
      {}
    );

  const currentSocketId = currentParticipant?.socketId;
  const currentSocket = io.sockets.sockets.get(currentSocketId || '');

  if (currentSocketId) {
    io.to(currentSocketId).emit('kicked you out');
    currentSocket?.leave(roomId);
    // io.in(currentSocketId).socketsLeave(roomId);
    // Emit a message to the remaining users in the room
    io.to(roomId).emit('room updated', {
      [roomId]: { ...server_history[roomId], participants: otherParticipants }
    });
  } else {
    console.log('Socket not found in the room');
  }

  return {
    ...server_history,
    [roomId]: { ...server_history[roomId], participants: otherParticipants }
  };
};
