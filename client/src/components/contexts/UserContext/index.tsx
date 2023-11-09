import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import useRoomAndUserInfo from '../../hooks/useRoomAndUserInfo';
import { useRoomContext } from '../RoomContext';
import { ServerRoomType } from '../../types';
import { useSocketContext } from '../SocketContext';

interface UserContextType {
  blockList: string[] | [];
  blockUser: (userId: string) => void;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const { userInfo, roomName } = useRoomAndUserInfo();
  const serverRoomData = useRoomContext();
  const roomData: ServerRoomType | object =
    Object.values(serverRoomData)[0] || {};
  const [blockList, setBlockList] = useState<string[] | []>([]);
  const { socketServer } = useSocketContext();

  const addUserToLocalBlockList = useCallback((userId: string) => {
    setBlockList((prev) => {
      return [...prev, userId];
    });
  }, []);

  const blockUser = (blockedUserId: string) => {
    //TODO: Will need to figure out how to do it on server
    // socketServer.blockUser(userInfo.userId, blockedUserId, roomName as string);
    addUserToLocalBlockList(blockedUserId);
  };

  console.log('blocklist updated', blockList);

  useEffect(() => {
    if ('participants' in roomData) {
      const currentUser = roomData.participants.find(
        (participant) => participant.userId === userInfo.userId
      );
      console.log('current User here', currentUser);
      if (currentUser?.name) {
        const currentBlockList = currentUser.blockList ?? [];

        console.log('current blockList here', currentUser);
        setBlockList((prev) => {
          return [...prev, ...currentBlockList];
        });
      }
    }
  }, []);
  return (
    <UserContext.Provider value={{ blockList, blockUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};