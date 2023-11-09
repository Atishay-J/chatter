import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRoomContext } from '../contexts/RoomContext';
import { ServerMessageType } from '../types';
import { useSocketContext } from '../contexts/SocketContext';
import { Text, VStack } from '@chakra-ui/react';
import { useUserContext } from '../contexts/UserContext';
import ChatMessage from './ChatMessage';

export default function ChatFeed({ roomName, roomData }) {
  const [roomMessages, setRoomMessages] = useState<ServerMessageType[]>([]);

  const { socket } = useSocketContext();

  const oldMessages: ServerMessageType[] | [] =
    'messages' in roomData ? roomData?.messages : [];
  const totalOldMsgCount = oldMessages.length;
  const { blockList } = useUserContext();
  const [filteredMessages, setFilteredMessages] = useState<ServerMessageType[]>(
    []
  );
  const vStackRef = useRef<HTMLDivElement>(null);

  console.log('ROom data here', {
    roomData,
    blockList,
    roomMessages,
    filteredMessages
  });

  const scrollToBottom = () => {
    if (vStackRef.current) {
      vStackRef.current.scrollTop = vStackRef.current.scrollHeight;
    }
  };

  const filterAndSetMessages = (
    messages: ServerMessageType[],
    callback: (messages: ServerMessageType[]) => void
  ) => {
    const filterBlockedUsersMsg = messages.filter((msg) =>
      (blockList as string[]).includes(msg.userId) ? false : true
    );
    console.log('Filtering messages', filterBlockedUsersMsg, blockList);
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

    return () => {
      socket.off('new message', handleNewMessage);
    };
  }, []);

  useEffect(() => {
    filterAndSetMessages(roomMessages, setFilteredMessages);
  }, [blockList, roomMessages]);

  useEffect(() => {
    vStackRef.current?.lastElementChild?.scrollIntoView();
  }, [filteredMessages]);

  console.log({ roomData, roomMessages });
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
