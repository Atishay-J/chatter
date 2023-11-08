import { validateMsg, addMsgToRoomHistory } from '../chat';

const postMessage = (
  server_history,
  socket,
  io,
  msgObj,
  userId,
  userName,
  roomId
) => {
  //TODO: Add ids inplace of names
  const isValidMsg = validateMsg(msgObj?.msg || '');
  if (!isValidMsg) {
    return io.in(roomId).to(userName).emit('invalid Msg');
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
