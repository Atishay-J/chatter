import { validateMsg, addMsgToRoomHistory } from '../chat';

const postMessage = (server_history, socket, msgObj, userName, roomName) => {
  const isValidMsg = validateMsg(msgObj?.msg || '');
  if (!isValidMsg) {
    return socket.in(roomName).to(userName).emit('invalid Msg');
  }
  socket.in(roomName).emit('new message', msgObj);
  const room_history = server_history?.[roomName] || {};
  const updatedRoomHistory = addMsgToRoomHistory(
    room_history,
    msgObj,
    userName
  );

  return { ...server_history, [roomName]: updatedRoomHistory };
};

export default postMessage;
