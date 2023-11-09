import React, { useCallback, useEffect, useState } from 'react';
import { useRoomContext } from '../contexts/RoomContext';
import { ServerMessageType } from '../types';
import { useSocketContext } from '../contexts/SocketContext';
import { VStack } from '@chakra-ui/react';
import { useUserContext } from '../contexts/UserContext';

export default function ChatFeed() {
  const [roomMessages, setRoomMessages] = useState<ServerMessageType[]>([]);
  const serverRoomData = useRoomContext();
  const { socket } = useSocketContext();
  const roomName = Object.keys(serverRoomData)[0] || '';
  const roomData = Object.values(serverRoomData)[0] || {};
  const oldMessages: ServerMessageType[] | [] =
    'messages' in roomData ? roomData?.messages : [];
  const totalOldMsgCount = oldMessages.length;
  const { blockList } = useUserContext();
  const [filteredMessages, setFilteredMessages] = useState<ServerMessageType[]>(
    []
  );

  console.log('ROom data here', {
    roomData,
    blockList,
    roomMessages,
    filteredMessages
  });

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
  console.log({ roomData, roomMessages });
  return (
    <VStack>
      <h1>Room Feed {roomName}</h1>
      <VStack>
        {filteredMessages?.map((message, idx) => (
          <h1 key={idx}>{message.msg}</h1>
        ))}
      </VStack>
    </VStack>
  );
}
