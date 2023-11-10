import { Divider, Text, VStack } from '@chakra-ui/react';
import ParticipantsStatusCard from './ParticipantsStatusCard';
import { ServerRoomType } from '../types';

export default function ParticipantsInRoom({
  roomData
}: {
  roomData: ServerRoomType;
}) {
  const participants = roomData.participants;
  console.log('Participant', participants);
  return (
    <VStack
      w="23%"
      bg="white"
      h="100%"
      borderRadius="18px"
      boxShadow="0px 0px 10px -2px rgba(200,200,200,0.4)"
      p="1rem"
      pl="1.5rem"
    >
      <VStack w="100%">
        {participants?.map((participant) => (
          <ParticipantsStatusCard
            key={participant.userId}
            name={participant.userName}
            userId={participant.userId}
            status={participant.status}
            role={participant.role}
          />
        ))}
      </VStack>
    </VStack>
  );
}
