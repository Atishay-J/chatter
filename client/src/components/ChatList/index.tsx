import { Text, VStack } from '@chakra-ui/react';
import React from 'react';

export default function ChatList({ roomName }: { roomName: string }) {
  return (
    <VStack
      w="23%"
      bg="white"
      h="100%"
      borderRadius="18px"
      boxShadow="0px 0px 10px -2px rgba(200,200,200,0.4)"
    >
      <Text>{roomName}</Text>
    </VStack>
  );
}
