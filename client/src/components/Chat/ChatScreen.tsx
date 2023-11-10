import React from 'react';
import { ChatFeed } from '.';
import ChatInputPanel from './ChatInputPanel';
import { Text, VStack } from '@chakra-ui/react';
import { ServerRoomType } from '../types';

interface ChatScreenType {
  roomData: ServerRoomType;
  roomName: string;
}

export default function ChatScreen({ roomData, roomName }: ChatScreenType) {
  return (
    <VStack
      w="51%"
      bg="white"
      h="100%"
      borderRadius="18px"
      pos="relative"
      boxShadow="0px 0px 10px -2px rgba(200,200,200,0.3)"
      overflow="hidden"
    >
      <Text h="6%" lineHeight="3.2rem" fontWeight="700" color="#122036">
        Room - {roomName}
      </Text>
      <VStack w="100%" h="94%" background="#f1f3fa" p="1rem">
        <ChatFeed roomData={roomData} />
        <ChatInputPanel />
      </VStack>
    </VStack>
  );
}
