import { Button, HStack, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSocketContext } from '../contexts/SocketContext';
import useRoomAndUserInfo from '../hooks/useRoomAndUserInfo';

export default function ChatInputPanel() {
  const [chat, setChat] = useState('');
  const { socketServer } = useSocketContext();
  const { roomName, userInfo } = useRoomAndUserInfo();
  const sendMessage = () => {
    if (roomName) {
      socketServer.sendMessage(userInfo.userName, roomName, chat);
    }
  };
  return (
    <HStack>
      <Input
        type="text"
        name="chat_input"
        value={chat}
        onChange={(e) => setChat(e.target.value)}
      />
      <Button onClick={sendMessage}>Send</Button>
    </HStack>
  );
}
