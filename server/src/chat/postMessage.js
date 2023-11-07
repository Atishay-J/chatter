import { validateMsg, addMsgToRoomHistory } from '../chat';

const postMessage = (
  server_history,
  socket,
  io,
  msgObj,
  userName,
  roomName
) => {
  const isValidMsg = validateMsg(msgObj?.msg || '');
  if (!isValidMsg) {
    return io.in(roomName).to(userName).emit('invalid Msg');
  }
  io.in(roomName).emit('new message', { ...msgObj, userName });
  const room_history = server_history?.[roomName] || {};
  const updatedRoomHistory = addMsgToRoomHistory(
    room_history,
    msgObj,
    userName
  );

  return { ...server_history, [roomName]: updatedRoomHistory };
};

export default postMessage;
