/**
 * create a room
 * @param {string} serverHistory
 * @param {string} roomName
 */

const createRoom = (roomName, userData, serverRoomData) => {
  const oldParticipants = serverRoomData.participants || [];
  const participants = [...oldParticipants, userData];
  const oldRoomData = serverRoomData || {};
  return { [roomName]: { ...oldRoomData, participants } };
};

export default createRoom;
