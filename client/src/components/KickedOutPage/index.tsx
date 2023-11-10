import { Text, VStack } from '@chakra-ui/react';
import React from 'react';

export default function KickedOutPage() {
  return (
    <VStack w="100%" h="100vh" justify="center" align="center">
      <Text fontSize="2rem" fontWeight="700">
        You have been kicked out
      </Text>
    </VStack>
  );
}
