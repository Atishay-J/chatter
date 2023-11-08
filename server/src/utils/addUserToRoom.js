import { createUser, createRoom } from './index';

/**
 *
 * @param {string} roomName
 * @param {string} userName
 * @param {string} role
 * @param {string} serverRoomData
 * @returns {object}
 */

const addUserToRoom = (roomName, userName, role, serverRoomData) => {
  const userData = createUser(userName, role);
  const roomData = createRoom(roomName, userData, serverRoomData);
  const roomId = Object.keys(roomData)[0];
  return { roomData, userId: userData.userId, roomId };
};

export default addUserToRoom;
