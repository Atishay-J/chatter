import { nanoid } from 'nanoid';
import { RoomData, UserData } from './global.types';
/**
 * create a room
 * @param {string} serverHistory
 * @param {string} roomName
 */

const createRoom = (
  roomName: string,
  userData: UserData,
  serverRoomData: RoomData
) => {
  const isRoomCreated = Object.keys(serverRoomData).length > 0;
  const roomId = isRoomCreated ? roomName : nanoid();
  const oldParticipants = serverRoomData.participants || [];
  const participants = [...oldParticipants, userData];
  const oldRoomData = serverRoomData || {};
  return { [roomId]: { ...oldRoomData, participants, roomName } };
};

export default createRoom;
