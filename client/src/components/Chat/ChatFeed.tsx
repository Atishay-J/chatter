import React, { useEffect, useRef, useState } from 'react';
import { ServerMessageType, ServerRoomType } from '../types';
import { useSocketContext } from '../contexts/SocketContext';
import { VStack, useToast } from '@chakra-ui/react';
import { useUserContext } from '../contexts/UserContext';
import ChatMessage from './ChatMessage';

export default function ChatFeed({ roomData }: { roomData: ServerRoomType }) {
  const [roomMessages, setRoomMessages] = useState<ServerMessageType[]>([]);

  const { socket } = useSocketContext();
  const toast = useToast();

  const oldMessages: ServerMessageType[] | [] =
    'messages' in roomData ? roomData?.messages : [];
  const totalOldMsgCount = oldMessages.length;
  const { blockList } = useUserContext();
  const [filteredMessages, setFilteredMessages] = useState<ServerMessageType[]>(
    []
  );
  const vStackRef = useRef<HTMLDivElement>(null);

  const showProfaneToast = () => {
    toast({
      title: 'Please remove any profanity and try again.',
      status: 'error',
      duration: 5000,
      isClosable: true,
      variant: 'top-accent'
    });
  };

  const filterAndSetMessages = (
    messages: ServerMessageType[],
    callback: (messages: ServerMessageType[]) => void
  ) => {
    const filterBlockedUsersMsg = messages.filter((msg) =>
      (blockList as string[]).includes(msg.userId) ? false : true
    );
    callback(filterBlockedUsersMsg);
  };

  useEffect(() => {
    setRoomMessages(oldMessages);
  }, [totalOldMsgCount]);

  useEffect(() => {
    const handleNewMessage = (...args: ServerMessageType[]) => {
      setRoomMessages((prev) => {
        return [...prev, ...args];
      });
    };
    socket.on('new message', handleNewMessage);
    socket.on('invalid Msg', showProfaneToast);

    return () => {
      socket.off('new message', handleNewMessage);
      socket.off('invalid Msg', showProfaneToast);
    };
  }, []);

  useEffect(() => {
    filterAndSetMessages(roomMessages, setFilteredMessages);
  }, [blockList, roomMessages]);

  useEffect(() => {
    vStackRef.current?.lastElementChild?.scrollIntoView();
  }, [filteredMessages]);

  console.log({ filteredMessages });

  return (
    <VStack
      ref={vStackRef}
      overflow="auto"
      w="100%"
      h="90%"
      maxH="89%"
      align="start"
      spacing="1.3rem"
    >
      {filteredMessages?.map((message, idx) => (
        <ChatMessage key={idx} message={message} />
      ))}
    </VStack>
  );
}
