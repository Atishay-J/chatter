import { Button, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { LuPlus } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

export default function CreateNewRoom() {
  const navigate = useNavigate();
  const createNewRoom = () => {
    navigate('/');
  };
  return (
    <Button w="100%" h="2.6rem" background="#26f07e" onClick={createNewRoom}>
      <HStack>
        <LuPlus />
        <Text> Create new room</Text>
      </HStack>
    </Button>
  );
}
