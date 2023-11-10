import { Box, Divider, HStack, Text, VStack } from '@chakra-ui/react';
import JoinRooomLink from '../RoomLink';
import { getInitials } from '../utils/getInitials';
import CreateNewRoom from './CreateNewRoom';

export default function ChatListPanel({ roomName }: { roomName: string }) {
  const roomInitials = getInitials(roomName);
  return (
    <VStack w="100%" h="70%" px="1rem">
      <Text
        w="100%"
        textAlign="left"
        fontSize="2xl"
        fontWeight="700"
        color="#353535"
      >
        Active Chats
      </Text>
      <HStack
        w="100%"
        bg="#f1f3fa"
        borderRadius="16px"
        h="3.5rem"
        align="center"
        p="0.5rem"
        spacing="1.1rem"
        cursor="pointer"
      >
        <Box
          w="2.5rem"
          h="2.5rem"
          borderRadius="50%"
          background="#942266"
          textAlign="center"
          lineHeight="2.5rem"
          color="white"
        >
          <Text fontSize="0.9rem">{roomInitials}</Text>
        </Box>
        <Text fontSize="1.1rem" fontWeight="500" color="#131414">
          {roomName}
        </Text>
      </HStack>
    </VStack>
  );
}
