import {
  Box,
  HStack,
  Popover,
  PopoverTrigger,
  Text,
  VStack,
  useDisclosure
} from '@chakra-ui/react';
import React from 'react';
import { getInitials } from '../utils/getInitials';
import ParticipantControlsPopup from './ParticipantControlsPopup';

interface ParticipantsStatusCardType {
  name: string;
  userId: string;
  status: string;
  role: 'Admin' | string;
}

export default function ParticipantsStatusCard({
  name,
  userId,
  status,
  role
}: ParticipantsStatusCardType) {
  const userInitials = getInitials(name);
  const { isOpen, onToggle, onClose } = useDisclosure();
  const dotColor = {
    online: 'green',
    offline: 'gray'
  };
  return (
    <>
      <Popover
        returnFocusOnClose={false}
        // isOpen={isOpen}
        // onClose={onClose}
        placement="right"
        closeOnBlur={true}
      >
        <PopoverTrigger>
          <HStack
            w="100%"
            align="center"
            spacing="1rem"
            // onClick={onToggle}
            cursor="pointer"
          >
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
              </HStack>
            </VStack>
          </HStack>
        </PopoverTrigger>
        <ParticipantControlsPopup
          name={name}
          userId={userId}
          status={status}
          role={role}
          userInitials={userInitials}
        />
      </Popover>
    </>
  );
}
