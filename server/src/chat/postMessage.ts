import { Server, Socket } from 'socket.io';
import { validateMsg, addMsgToRoomHistory } from '../chat';
import { ChatMessageWithIds, ServerHistory } from '../utils/global.types';

const postMessage = (
  server_history: ServerHistory,
  socket: Socket,
  io: Server,
  msgObj: ChatMessageWithIds,
  userId: string,
  userName: string,
  roomId: string
) => {
  const currentRoom = server_history?.[roomId];
  const currentUser = currentRoom?.participants?.find(
    (user) => user.userId === userId
  );
  const blackListedUsers = currentUser?.blockList;
  const isValidMsg = validateMsg(msgObj?.msg || '');
  if (!isValidMsg) {
    return io.in(roomId).to(userId).emit('invalid Msg');
  }

  io.in(roomId).emit('new message', { ...msgObj, userName, userId });

  const room_history = server_history?.[roomId] || {};
  const updatedRoomHistory = addMsgToRoomHistory(
    room_history,
    msgObj,
    userName,
    userId
  );

  return { ...server_history, [roomId]: updatedRoomHistory };
};

export default postMessage;
