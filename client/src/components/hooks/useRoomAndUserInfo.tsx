import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

export default function useRoomAndUserInfo() {
  // const { state } = useLocation();
  const { roomName } = useParams();
  const [userInfo, setUserInfo] = useState<Record<string, string>>({});

  useEffect(() => {
    const data = localStorage.getItem('userInfo') || '';
    try {
      if (data) {
        const jsonUserInfo = JSON.parse(data);
        setUserInfo(jsonUserInfo);
      }
    } catch (err) {
      console.error('Error parsing JSON:', err);
    }
  }, []);

  return { roomName, userInfo };
}
