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

interface UserContextType {
  blockList: string[] | [];
  blockUser: (userId: string) => void;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const { userInfo } = useRoomAndUserInfo();
  const serverRoomData = useRoomContext();
  const roomData: ServerRoomType | object =
    Object.values(serverRoomData)[0] || {};
  const [blockList, setBlockList] = useState<string[] | []>([]);

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

  useEffect(() => {
    if ('participants' in roomData) {
      const currentUser = roomData.participants.find(
        (participant) => participant.userId === userInfo.userId
      );
      if (currentUser?.userName) {
        const currentBlockList = currentUser.blockList ?? [];

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
