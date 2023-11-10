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
  if (participants) {
    //@ts-ignore
    const { currentParticipant, otherParticipants } = participants.reduce(
      (acc, cur) => {
        if (cur.userId === userId) {
          return { currentParticipant: cur, ...acc };
        } else {
          return {
            ...acc,
            //@ts-ignore
            otherParticipants: [...(acc?.otherParticipants || []), cur]
          };
        }
      },
      {}
    );

    const updatedCurrentParticipant = {
      ...currentParticipant,
      status: 'offline'
    };

    const updatedRoom = {
      [roomId]: {
        ...currentRoom,
        participants: [
          ...(otherParticipants?.length > 0 ? otherParticipants : []),
          updatedCurrentParticipant
        ]
      }
    };

    io.to(roomId).emit('room updated', updatedRoom);
    socket.leave(roomId);
    return {
      ...server_history,
      ...updatedRoom
    };
  } else {
    console.error('No participants in room');
  }
};
