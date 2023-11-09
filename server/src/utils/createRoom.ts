import { nanoid } from 'nanoid';
import { RoomData, ServerHistory, UserData } from './global.types';
/**
 * create a room
 * @param {string} serverHistory
 * @param {string} roomName
 */

const createRoom = (
  roomName: string,
  userData: UserData,
  serverRoomData: ServerHistory
) => {
  const oldRoomData = serverRoomData?.[roomName] || {};
  const roomNameToUse = oldRoomData?.roomName ?? roomName;
  const oldRoomId = Object.keys(serverRoomData || {})?.[0];
  const isRoomCreated = oldRoomId?.length > 0;
  const roomId = isRoomCreated ? oldRoomId : nanoid();
  const oldParticipants = oldRoomData.participants || [];
  const participants = [...oldParticipants, userData];
  return {
    [roomId]: { ...oldRoomData, participants, roomName: roomNameToUse }
  };
};

export default createRoom;
