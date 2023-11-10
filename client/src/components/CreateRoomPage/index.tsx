import { Button, Center, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSocketContext } from '../contexts/SocketContext';
import { useNavigate } from 'react-router-dom';

export default function CreateRoomPage() {
  const [userName, setUserName] = useState('');
  const [roomName, setRoomName] = useState('');
  const { socket, socketServer } = useSocketContext();
  const navigate = useNavigate();

  const joinRoom = async () => {
    const joinRoomResponse = await socketServer.joinRoom(userName, roomName);
    console.log(
      'should join room',
      socket,
      userName,
      roomName,
      joinRoomResponse
    );
    if (joinRoomResponse) {
      const { roomId, userId } = joinRoomResponse;
      const userInfo = { userName, userId, roomId, role: 'Admin' };
      const stringifiedUserInfo = JSON.stringify(userInfo);
      console.log({ stringifiedUserInfo });
      sessionStorage.setItem('userInfo', stringifiedUserInfo);

      navigate(`/room/${roomId}`, {
        state: { userInfo: { userName, userId } }
      });
    }
  };

  return (
    <Center h="100vh">
      <VStack
        w="80%"
        spacing="3rem"
        maxW="500px"
        boxShadow="0px 0px 8px 0px rgba(200,200,200,0.5)"
        p="10rem 8rem"
        borderRadius="18px"
      >
        <VStack w="100%" spacing="1rem">
          <Input
            type="text"
            name="room_name"
            onChange={(e) => setRoomName(e.target.value)}
            value={roomName}
            placeholder="Enter Room Name"
          />
          <Input
            type="text"
            name="user_name"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            placeholder="Enter your Name"
          />
        </VStack>

        <Button onClick={joinRoom} background="#2c39df" color="white">
          Join Room
        </Button>
      </VStack>
    </Center>
  );
}
