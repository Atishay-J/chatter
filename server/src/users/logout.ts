import { Server, Socket } from 'socket.io';
import { ServerHistory, UserData } from '../utils/global.types';

export const logout = (
  userId: string,
  roomId: string,
  socket: Socket,
  io: Server,
  server_history: ServerHistory
) => {
  const currentRoom = server_history?.[roomId];
  const participants = currentRoom?.participants;
  const { currentParticipant, otherParticipants } =
    participants?.reduce(
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
    ) || {};

  const updatedCurrentParticipant = {
    ...currentParticipant,
    status: 'offline'
  };

  socket.leave(roomId);
  const updatedRoom = {
    [roomId]: {
      ...currentRoom,
      //@ts-ignore
      participants: [...otherParticipants, updatedCurrentParticipant]
    }
  };

  io.to(roomId).emit('room updated', updatedRoom);

  return {
    ...server_history,
    ...updatedRoom
  };
};
