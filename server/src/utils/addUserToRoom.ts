import { AddUserToRoomParams } from '../users/user.types';
import { RoomData, ServerHistory, UserRole } from './global.types';
import { createUser, createRoom } from './index';

/**
 *
 * @param {string} roomName
 * @param {string} userName
 * @param {string} role
 * @param {string} serverRoomData
 * @returns {object}
 */

const addUserToRoom = (
  roomName: string,
  userName: string,
  role: UserRole,
  serverRoomData: ServerHistory
) => {
  const userData = createUser(userName, role);
  const roomData = createRoom(roomName, userData, serverRoomData);
  const roomId = Object.keys(roomData)[0];
  return { roomData, userId: userData.userId, roomId };
};

export default addUserToRoom;
