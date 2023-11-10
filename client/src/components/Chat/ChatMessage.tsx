import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { ServerMessageType } from '../types';
import { formatRelative } from 'date-fns';
import { getInitials } from '../utils/getInitials';

export default function ChatMessage({
  message
}: {
  message: ServerMessageType;
}) {
  const userName = message.userName;
  const userInitials = getInitials(userName);

  return (
    <HStack spacing="1.2rem">
      <Box
        w="2.5rem"
        h="2.5rem"
        borderRadius="50%"
        background="blue.500"
        textAlign="center"
        lineHeight="2.5rem"
        color="white"
        alignSelf="flex-start"
      >
        <Text fontSize="0.9rem">{userInitials}</Text>
      </Box>
      <VStack textAlign="left" spacing={0} minW="15rem" minH="3rem">
        <HStack w="100%" spacing="0.7rem" align="flex-end">
          <Text fontSize="1rem" fontWeight="500" color="blue.300">
            {message.userName}
          </Text>
          <Text fontSize="0.86rem" fontWeight="400" color="gray.400">
            {formatRelative(new Date(message.timeStamp), new Date())}
          </Text>
        </HStack>
        <Text w="100%" fontSize="1rem" p="0" whiteSpace="pre-line">
          {message.msg}
        </Text>
      </VStack>
    </HStack>
  );
}
