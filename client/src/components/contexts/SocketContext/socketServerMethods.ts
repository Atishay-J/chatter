import { Socket } from 'socket.io-client';
import {
  JoinRoomResponseType,
  SocketMethods
} from './socketServerMethodsTypes';
import { ServerRoomType } from '../../types';

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
    },
    blockUser: (userId: string, blockedUserId: string, roomName: string) => {
      socket.emit('block user', userId, blockedUserId, roomName);
    },
    getRoomData: async (roomId: string) => {
      try {
        const response: Record<string, ServerRoomType> =
          await socket.emitWithAck('get room data', roomId);
        return response;
      } catch (err) {}
    },
    rejoinRooms: (roomIds: string[]) => {
      socket.emit('rejoin rooms', roomIds);
    },
    kickOutUser: (userId: string, roomId: string) => {
      socket.emit('kick out', userId, roomId);
    },
    logout: (roomId: string, userId: string) => {
      socket.emit('logout', roomId, userId);
    }
  };
};
