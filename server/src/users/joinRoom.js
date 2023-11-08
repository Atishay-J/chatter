import { addUserToRoom } from '../utils';

/**
 *
 * @param {string} server_history
 * @param {IO} io
 * @param {Socket} socket
 * @param {string} roomName
 * @param {string} role
 * @param {string} name
 */

const joinRoom = (server_history, socket, io, roomName, role, name) => {
  const oldRoomData = server_history[roomName] || {};
  const { roomData, userId, roomId } = addUserToRoom(
    roomName,
    name,
    role,
    oldRoomData
  );
  console.log('user in room', roomData, userId, roomId);
  socket.join(roomId);
  const updatedHistory = { ...server_history, ...roomData };
  socket.emit('user joined', updatedHistory);
  io.in(roomId).to(userId).emit('room data', roomData);
  return { updatedHistory, userId, roomId };
};

export default joinRoom;
