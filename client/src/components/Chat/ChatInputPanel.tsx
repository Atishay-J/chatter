import { Button, HStack, Input, Textarea } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSocketContext } from '../contexts/SocketContext';
import useRoomAndUserInfo from '../hooks/useRoomAndUserInfo';
import { useUserContext } from '../contexts/UserContext';
import ResizeTextarea from 'react-textarea-autosize';

export default function ChatInputPanel() {
  const [chat, setChat] = useState('');
  const { socketServer } = useSocketContext();
  const { roomName, userInfo } = useRoomAndUserInfo();
  const { blockUser } = useUserContext();

  const sendMessage = () => {
    if (roomName) {
      socketServer.sendMessage(
        userInfo.userId,
        userInfo.userName,
        roomName,
        chat
      );
      setChat('');
    }
  };
  return (
    <HStack
      pos="absolute"
      bottom="1rem"
      w="90%"
      background="white"
      borderRadius="24px"
    >
      <Textarea
        name="chat_input"
        value={chat}
        onChange={(e) => setChat(e.target.value)}
        border="none"
        resize="none"
        borderRadius="24px"
        placeholder="Enter your message"
        minH="unset"
        minRows={1}
        maxRows={5}
        overflow="auto"
        _placeholder={{
          fontSize: '1.1rem',
          fontWeight: '500'
        }}
        p="1rem"
        as={ResizeTextarea}
      />
      <Button onClick={sendMessage} background="#2c39df" color="white">
        Send
      </Button>
      <Button onClick={() => blockUser('-Vegdq7yjFvVqiK8C3nDE')}>Block</Button>
    </HStack>
  );
}
