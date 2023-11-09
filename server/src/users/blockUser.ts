import { RoomData, ServerHistory } from '../utils/global.types';

export const blockUser = (
  userId: string,
  blockedUserId: string,
  roomId: string,
  server_history: ServerHistory
) => {
  const room_history = server_history[roomId];
  const participants = room_history.participants;
  const updatedParticipantList = participants.map((participant) => {
    const participantBlockList = participant['blockList'] || [];
    if (participant.userId === userId) {
      return {
        ...participant,
        blockList: [...participantBlockList, blockedUserId]
      };
    }
    if (participant.userId === blockedUserId) {
      return {
        ...participant,
        blockList: [...participantBlockList, userId]
      };
    }
    return participant;
  });

  const updatedRoomData: RoomData = {
    ...room_history,
    participants: updatedParticipantList
  };
  console.log('Should Block user', { ...server_history, updatedRoomData });
  return { ...server_history, [roomId]: updatedRoomData };
};
