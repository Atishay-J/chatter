import {
  HStack,
  IconButton,
  Input,
  Text,
  VStack,
  useToast
} from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { LuCopy } from 'react-icons/lu';

export default function JoinRooomLink() {
  const { roomName } = useParams();
  const toast = useToast();
  const currentDomain = window.location.host;
  const meetingUrl = `${currentDomain}/join/${roomName}`;

  const copyLink = () => {
    navigator.clipboard.writeText(meetingUrl);
    toast({
      title: 'Link Copied to clipboard.',
      //   description: "We've created your account for you.",
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'bottom-left'
    });
  };

  return (
    <VStack>
      <Text fontSize="md" fontWeight="600" color="#2b2b2c">
        Invite Others
      </Text>
      <HStack w="100%%" spacing="0">
        <Input
          w="100%"
          type="text"
          disabled={true}
          value={meetingUrl}
          background="#f1f3fa"
        />
        <IconButton
          aria-label="copy room link"
          background="#2c39df"
          color="white"
          icon={<LuCopy />}
          onClick={copyLink}
        />
      </HStack>
    </VStack>
  );
}
