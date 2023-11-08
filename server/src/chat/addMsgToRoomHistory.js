const addMsgToRoomHistory = (room_history, msgObj, userName, userId) => {
  const oldMessages = room_history?.messages || [];
  const newMsgObj = {
    ...msgObj,
    userName,
    userId
  };
  return { ...room_history, messages: [...oldMessages, newMsgObj] };
};

export default addMsgToRoomHistory;
