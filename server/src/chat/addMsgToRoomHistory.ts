import { ChatMessageWithIds, RoomData } from '../utils/global.types';

const addMsgToRoomHistory = (
  room_history: RoomData,
  msgObj: ChatMessageWithIds,
  userName: string,
  userId: string
) => {
  const oldMessages = room_history?.messages || [];
  const newMsgObj = {
    ...msgObj,
    userName,
    userId
  };
  return { ...room_history, messages: [...oldMessages, newMsgObj] };
};

export default addMsgToRoomHistory;
