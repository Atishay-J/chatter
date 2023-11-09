import { VStack } from '@chakra-ui/react';
import ParticipantsStatusCard from './ParticipantsStatusCard';

export default function ParticipantsInRoom({ roomData }) {
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
      {participants?.map((participant) => (
        <ParticipantsStatusCard
          key={participant.userId}
          name={participant.userName}
          status={'online'}
          role={participant.role}
        />
      ))}
    </VStack>
  );
}
