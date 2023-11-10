import React from 'react';
import JoinRooomLink from '../RoomLink';
import { Text, VStack } from '@chakra-ui/react';
import CreateNewRoom from './CreateNewRoom';

export default function CreateAndJoinRoomPanel() {
  return (
    <VStack w="100%" px="1rem">
      <JoinRooomLink />
      <Text fontWeight="700" color="#3d3e40">
        Or
      </Text>
      <CreateNewRoom />
    </VStack>
  );
}
