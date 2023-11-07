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
  socket.join(roomName);
  const oldRoomData = server_history[roomName] || {};
  const userInRoom = addUserToRoom(roomName, name, role, oldRoomData);
  const updatedHistory = { ...server_history, ...userInRoom };
  socket.emit('user joined', updatedHistory);
  io.in(roomName).to(name).emit('room data', userInRoom);
  return updatedHistory;
};

export default joinRoom;
