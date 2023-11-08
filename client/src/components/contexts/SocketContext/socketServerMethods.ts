import { Socket } from 'socket.io-client';
import {
  JoinRoomResponseType,
  SocketMethods
} from './socketServerMethodsTypes';

export const createSocketMethods = (socket: Socket): SocketMethods => {
  return {
    joinRoom: async (userName: string, roomName: string, role?: string) => {
      try {
        const response: Record<'data', JoinRoomResponseType> =
          await socket.emitWithAck(
            'join room',
            userName,
            roomName,
            role || 'Admin'
          );
        console.log({ response });
        const data = response.data;
        return data;
      } catch (err) {
        console.error('Error Joining Room', err);
      }
    },
    sendMessage: (
      userId: string,
      userName: string,
      roomId: string,
      message: string
    ) => {
      const msgObject = {
        msg: message,
        timeStamp: new Date()
      };
      socket.emit('chat message', userId, userName, roomId, msgObject);
    }
  };
};
