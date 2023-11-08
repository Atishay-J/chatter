import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

export default function useRoomAndUserInfo() {
  const { state } = useLocation();
  const { roomName } = useParams();

  return { roomName, userInfo: state?.userInfo };
}
