export interface JoinRoomResponseType {
  roomId: string;
  userId: string;
}
export type SocketMethods = {
  joinRoom: (
    userName: string,
    roomName: string,
    role?: string
  ) => Promise<JoinRoomResponseType | undefined>;
  sendMessage: (
    userId: string,
    userName: string,
    roomId: string,
    message: string
  ) => void;
};
