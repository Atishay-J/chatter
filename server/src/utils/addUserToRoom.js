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
  const roomData = createRoom(roomName);
  const oldParticipants = serverRoomData.participants || [];
  return {
    ...roomData,
    [roomName]: {
      participants: [...oldParticipants, userData]
    }
  };
};

export default addUserToRoom;
