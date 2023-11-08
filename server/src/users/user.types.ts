import { Server, Socket } from 'socket.io';
import { RoomData, ServerHistory, UserRole } from '../utils/global.types';

export interface JoinRoomParams {
  server_history: ServerHistory;
  socket: Socket;
  io: Server;
  roomName: string;
  role: UserRole;
  userName: string;
}

export interface AddUserToRoomParams {
  roomName: string;
  userName: string;
  role: UserRole;
  serverRoomData: RoomData;
}
