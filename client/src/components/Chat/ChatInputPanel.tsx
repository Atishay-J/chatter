import { Button, HStack, IconButton, Input, Textarea } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSocketContext } from '../contexts/SocketContext';
import useRoomAndUserInfo from '../hooks/useRoomAndUserInfo';
import { useUserContext } from '../contexts/UserContext';
import ResizeTextarea from 'react-textarea-autosize';
import { LuSend } from 'react-icons/lu';

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
      <IconButton
        onClick={sendMessage}
        aria-label="Send Message"
        background="#2c39df"
        // variant="ghost"
        color="white"
        fontSize="1.3rem"
        margin="0"
        icon={<LuSend />}
        size="md"
        mr="0.4rem"
        // borderRadius="0px 24px 24px 0px"
      />
      {/* <Button onClick={() => blockUser('-Vegdq7yjFvVqiK8C3nDE')}>Block</Button> */}
    </HStack>
  );
}
