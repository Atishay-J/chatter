import { Socket } from 'socket.io-client';
import { SocketMethods } from './socketServerMethodsTypes';

export const createSocketMethods = (socket: Socket): SocketMethods => {
  return {
    joinRoom: (userName: string, roomName: string, role?: string) => {
      socket.emit('join room', userName, roomName, role || 'Admin');
    }
  };
};
