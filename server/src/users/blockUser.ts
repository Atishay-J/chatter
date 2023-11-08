import { ServerHistory } from '../utils/global.types';

const blockUser = (
  userId: string,
  blockedUserId: string,
  roomId: string,
  server_history: ServerHistory
) => {
  const room_history = server_history[roomId];
};
