import { nanoid } from 'nanoid';
/**
 * create a room
 * @param {string} serverHistory
 * @param {string} roomName
 */

const createRoom = (roomName, userData, serverRoomData) => {
  const isRoomCreated = Object.keys(serverRoomData).length > 0;
  const roomId = isRoomCreated ? roomName : nanoid();
  const oldParticipants = serverRoomData.participants || [];
  const participants = [...oldParticipants, userData];
  const oldRoomData = serverRoomData || {};
  return { [roomId]: { ...oldRoomData, participants, roomName } };
};

export default createRoom;
