import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';
import { useSocketContext } from '../SocketContext';

const RoomContext = createContext({} as Record<string, unknown>);

export const RoomContextProvider = ({ children }: { children: ReactNode }) => {
  const [roomData, setRoomData] = useState({});
  const { socket } = useSocketContext();
  useEffect(() => {
    socket.on('room data', (roomData) => {
      console.log('should get roomdata');
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
