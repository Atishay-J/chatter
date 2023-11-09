import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  Text,
  VStack
} from '@chakra-ui/react';
import React from 'react';
import { useUserContext } from '../contexts/UserContext';

interface ParticipantControlsPopupType {
  name: string;
  userId: string;
  status: string;
  role: 'Admin' | string;
  userInitials: string;
}

export default function ParticipantControlsPopup({
  name,
  status,
  userId,
  role,
  userInitials
}: ParticipantControlsPopupType) {
  const { blockUser } = useUserContext();

  const muteUser = () => {
    blockUser(userId);
  };

  const dotColor = {
    online: 'green',
    offline: 'gray'
  };

  return (
    <PopoverContent>
      <PopoverArrow />
      <PopoverBody>
        <HStack w="100%" align="center" spacing="1rem">
          <Box pos="relative">
            <Box
              w="2.1rem"
              h="2.1rem"
              borderRadius="50%"
              background="blue.500"
              textAlign="center"
              lineHeight="2.1rem"
              color="white"
              // alignSelf="flex-start"
            >
              <Text>{userInitials}</Text>
            </Box>
            <Box
              w="0.8rem"
              h="0.8rem"
              //@ts-ignore
              background={dotColor[status]}
              borderRadius="50%"
              boxShadow="0px 0px 10px -1px rgba(200,200,200,0.7)"
              position="absolute"
              bottom="0"
              right="0"
            ></Box>
          </Box>
          <VStack spacing="0">
            <Text w="100%" fontSize="1rem" fontWeight="500" color="blue.300">
              {name}
            </Text>

            <HStack>
              <Text fontSize="0.8rem" fontWeight="400" color="gray.500">
                {status}
              </Text>
              <Text
                w="100%"
                fontSize="0.8rem"
                fontWeight="500"
                color="green.600"
              >
                {role}
              </Text>
            </HStack>
          </VStack>
        </HStack>
      </PopoverBody>
      <PopoverFooter display="flex" justifyContent="flex-end">
        <ButtonGroup size="sm">
          <Button colorScheme="red" onClick={muteUser}>
            Mute
          </Button>
        </ButtonGroup>
      </PopoverFooter>
    </PopoverContent>
  );
}
