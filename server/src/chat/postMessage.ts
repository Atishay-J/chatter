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
  //TODO: Add ids inplace of names
  const isValidMsg = validateMsg(msgObj?.msg || '');
  if (!isValidMsg) {
    console.log('Found Bad Message');
    return io.in(roomId).to(userId).emit('invalid Msg');
  }

  // const socketsInRoom = io.sockets.adapter.rooms.get(roomId);
  // if (socketsInRoom) {
  //   socketsInRoom.forEach((socketId) => {
  //     const socket = io.sockets.sockets.get(socketId);
  //     if (socket) {
  //       // if (!blackListedUsers.includes(socket.userId)) {
  //       //   io.to('roomName').to(socketId).emit('message', 'Hello, everyone except some users in the room!');
  //       // }
  //     }
  //   });

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
