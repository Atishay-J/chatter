import { Socket } from 'socket.io-client';
import { SocketMethods } from './socketServerMethodsTypes';

export const createSocketMethods = (socket: Socket): SocketMethods => {
  return {
    joinRoom: (userName: string, roomName: string, role?: string) => {
      socket.emit('join room', userName, roomName, role || 'Admin');
    },
    sendMessage: (userName: string, roomName: string, message: string) => {
      const msgObject = {
        msg: message,
        timeStamp: new Date()
      };
      socket.emit('chat message', userName, roomName, msgObject);
    }
  };
};
