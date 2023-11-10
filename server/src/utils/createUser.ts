import { nanoid } from 'nanoid';
import { UserData, UserRole } from './global.types';
import { Socket } from 'socket.io';

const createUser = (
  userName: string,
  role: UserRole,
  socket: Socket
): UserData => {
  const userId = nanoid();
  return { userName, role, userId, socketId: socket.id };
};

export default createUser;
