import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';
import { useSocketContext } from '../SocketContext';
import { ServerRoomType } from '../../types';

const RoomContext = createContext(
  {} as Record<string, ServerRoomType> | object
);

export const RoomContextProvider = ({ children }: { children: ReactNode }) => {
  const [roomData, setRoomData] = useState<
    Record<string, ServerRoomType> | object
  >({});
  const { socket } = useSocketContext();
  useEffect(() => {
    socket.on('room data', (roomData: Record<string, ServerRoomType>) => {
      console.log('should get roomdata', roomData);
      setRoomData(roomData);
    });
  }, []);
  return (
    <RoomContext.Provider value={roomData}>{children}</RoomContext.Provider>
  );
};

export const useRoomContext = () => {
  return useContext(RoomContext);
};
