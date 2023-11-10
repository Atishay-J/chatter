import { addUserToRoom } from '../utils';
import { JoinRoomParams } from './user.types';
import { ServerHistory, UserRole } from '../utils/global.types';
import { Server, Socket } from 'socket.io';

/**
 *
 * @param {string} server_history
 * @param {IO} io
 * @param {Socket} socket
 * @param {string} roomName
 * @param {string} role
 * @param {string} name
 */

const joinRoom = (
  server_history: ServerHistory,
  socket: Socket,
  io: Server,
  roomName: string,
  role: UserRole,
  userName: string
) => {
  const { roomData, userId, roomId } = addUserToRoom(
    roomName,
    userName,
    role,
    server_history,
    socket
  );
  socket.join(roomId);
  const updatedHistory = { ...server_history, ...roomData };
  socket.emit('user joined', updatedHistory);
  io.in(roomId).to(userId).emit('room data', roomData);
  return { updatedHistory, userId, roomId };
};

export default joinRoom;
