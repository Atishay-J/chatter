import { Divider, VStack } from '@chakra-ui/react';
import React from 'react';
import CreateAndJoinRoomPanel from '../RoomPagePanels/CreateAndJoinRoomPanel';
import ChatListPanel from '../RoomPagePanels/ChatListPanel';
import LogoutPanel from '../RoomPagePanels/LogoutPanel';

export default function RoomSidePanel({ roomName }: { roomName: string }) {
  return (
    <VStack
      w="23%"
      bg="white"
      h="100%"
      borderRadius="18px"
      boxShadow="0px 0px 10px -2px rgba(200,200,200,0.4)"
      px="0.3rem"
      py="1rem"
      spacing="1rem"
    >
      <CreateAndJoinRoomPanel />
      <Divider w="90%" />
      <ChatListPanel roomName={roomName} />
      <Divider w="90%" />
      <LogoutPanel />
    </VStack>
  );
}
