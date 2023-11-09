import { HStack, IconButton, Input } from '@chakra-ui/react';
import { LinkIcon } from '@chakra-ui/icon';
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

export default function JoinRooomLink() {
  const { roomName } = useParams();
  const currentDomain = window.location.host;
  const meetingUrl = `${currentDomain}/join/${roomName}`;

  return (
    <HStack>
      <Input type="text" disabled={true} value={meetingUrl} />
      <IconButton aria-label="copy room link" icon={<LinkIcon />} />
    </HStack>
  );
}
