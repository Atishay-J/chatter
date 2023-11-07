/**
 * create a room
 * @param {string} serverHistory
 * @param {string} roomName
 */

const createRoom = (roomName) => {
  return { [roomName]: {} };
};

export default createRoom;
