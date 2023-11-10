import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';
import { useSocketContext } from '../SocketContext';
import { ServerRoomType } from '../../types';
import {
  matchPath,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';
import useRoomAndUserInfo from '../../hooks/useRoomAndUserInfo';

const RoomContext = createContext(
  {} as Record<string, ServerRoomType> | object
);

export const RoomContextProvider = ({ children }: { children: ReactNode }) => {
  const [roomData, setRoomData] = useState<
    Record<string, ServerRoomType> | object
  >({});
  const { socket, socketServer } = useSocketContext();
  const { userInfo } = useRoomAndUserInfo();
  const roomId = userInfo?.roomId || '';
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const getAndSetRoomData = async () => {
    const roomDataResponse = await socketServer.getRoomData(roomId || '');
    console.log('Getting and setting', roomDataResponse, roomId);
    setRoomData(roomDataResponse || {});
  };

  const navigateToKickedOutpage = () => {
    navigate('/alibaba');
  };

  console.log('====>>', roomId, roomData);
  useEffect(() => {
    socket.on('room data', (roomData: Record<string, ServerRoomType>) => {
      console.log('should get roomdata', roomData);
      setRoomData(roomData);
    });

    socket.on('room updated', (data) => setRoomData(data));
    socket.on('kicked you out', navigateToKickedOutpage);

    if (roomId) {
      console.log('Is rejoining old room');
      socketServer.rejoinRooms([roomId]);
      getAndSetRoomData();
    }

    return () => {
      socket.off('room data', () => {});
      socket.off('room updated', getAndSetRoomData);
      socket.off('kicked you out', navigateToKickedOutpage);
    };
  }, [roomId]);
  return (
    <RoomContext.Provider value={roomData}>{children}</RoomContext.Provider>
  );
};

export const useRoomContext = () => {
  return useContext(RoomContext);
};
