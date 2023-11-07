import { addUserToRoom } from '../utils';

/**
 *
 * @param {string} server_history
 * @param {Socket} socket
 * @param {string} roomName
 * @param {string} role
 * @param {string} name
 */

const joinRoom = (server_history, socket, roomName, role, name) => {
  const oldRoomData = server_history[roomName] || {};
  const userInRoom = addUserToRoom(roomName, name, role, oldRoomData);
  const updatedHistory = { ...server_history, ...userInRoom };
  socket.emit('user joined', 'sdfdfdfsdf', updatedHistory);
  return updatedHistory;
};

export default joinRoom;
