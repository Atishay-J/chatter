import { HStack, VStack } from '@chakra-ui/react';
import ParticipantsInRoom from '../ParticipantsInRoom';
import { useRoomContext } from '../contexts/RoomContext';
import ChatList from '../ChatList';
import { ChatScreen } from '../Chat';
import { ServerRoomType } from '../types';

export default function RoomPage() {
  const serverRoomData: Record<string, ServerRoomType> | object =
    useRoomContext();
  const roomData = Object.values(serverRoomData)[0] || {};

  return (
    <HStack
      w="100%"
      h="100vh"
      background="#f9fafd"
      p="0.5rem 0.2rem"
      justify="space-between"
    >
      <ChatList roomName={roomData?.roomName} />
      <ChatScreen roomData={roomData} roomName={roomData?.roomName} />
      <ParticipantsInRoom roomData={roomData} />
    </HStack>
  );
}
