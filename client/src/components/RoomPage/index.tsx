import { VStack } from '@chakra-ui/react';
import { ChatFeed } from '../Chat';
import ChatInputPanel from '../Chat/ChatInputPanel';

export default function RoomPage() {
  return (
    <VStack>
      <ChatFeed />
      <ChatInputPanel />
    </VStack>
  );
}
