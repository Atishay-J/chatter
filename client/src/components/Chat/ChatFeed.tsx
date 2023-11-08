import React, { useEffect, useState } from 'react';
import { useRoomContext } from '../contexts/RoomContext';
import { ServerMessageType } from '../types';
import { useSocketContext } from '../contexts/SocketContext';
import { VStack } from '@chakra-ui/react';

export default function ChatFeed() {
  const [roomMessages, setRoomMessages] = useState<ServerMessageType[]>([]);
  const serverRoomData = useRoomContext();
  const { socket } = useSocketContext();
  const roomName = Object.keys(serverRoomData)[0] || '';
  const roomData = Object.values(serverRoomData)[0] || {};
  const oldMessages: ServerMessageType[] | [] =
    'messages' in roomData ? roomData?.messages : [];
  const totalMsgCount = oldMessages.length;

  useEffect(() => {
    setRoomMessages(oldMessages);
  }, [totalMsgCount]);

  useEffect(() => {
    const handleNewMessage = (...args: ServerMessageType[]) => {
      console.log('New Message', args);
      setRoomMessages((prev) => {
        return [...prev, ...args];
      });
    };

    // Attach the socket event listener
    socket.on('new message', handleNewMessage);

    // Clean up: remove the listener when the component unmounts or when dependencies change
    return () => {
      socket.off('new message', handleNewMessage);
    };
  }, []);
  console.log({ roomData, roomMessages });
  return (
    <VStack>
      <h1>Room Feed {roomName}</h1>
      <VStack>
        {roomMessages?.map((message, idx) => (
          <h1 key={idx}>{message.msg}</h1>
        ))}
      </VStack>
    </VStack>
  );
}
