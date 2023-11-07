const addMsgToRoomHistory = (room_history, msgObj, userName) => {
  const oldMessages = room_history?.messages || [];
  const newMsgObj = {
    ...msgObj,
    userName
  };
  return { ...room_history, messages: [...oldMessages, newMsgObj] };
};

export default addMsgToRoomHistory;
