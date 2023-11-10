import { Button, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { TbLogout2 } from 'react-icons/tb';
import { useSocketContext } from '../contexts/SocketContext';
import useRoomAndUserInfo from '../hooks/useRoomAndUserInfo';
import { useNavigate } from 'react-router-dom';

export default function LogoutPanel() {
  const { socketServer } = useSocketContext();
  const { userInfo } = useRoomAndUserInfo();
  const navigate = useNavigate();

  const logout = () => {
    socketServer.logout(userInfo.roomId, userInfo.userId);
    navigate('/');
  };
  return (
    <VStack w="100%" alignSelf="flex-end" justifySelf="flex-end">
      <Button
        w="100%"
        h="3rem"
        variant="ghost"
        color="#4b4c4d"
        onClick={logout}
      >
        <HStack w="100%" justify="center" spacing="1rem" fontSize="1.4rem">
          <TbLogout2 />
          <Text fontSize="1rem">Logout</Text>
        </HStack>
      </Button>
    </VStack>
  );
}
