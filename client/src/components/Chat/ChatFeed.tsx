import React from 'react';
import { useRoomContext } from '../contexts/RoomContext';

export default function ChatFeed() {
  const roomData = useRoomContext();
  console.log({ roomData });
  return <div>ChatRoom</div>;
}
