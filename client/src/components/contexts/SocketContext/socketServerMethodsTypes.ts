export type SocketMethods = {
  joinRoom: (userName: string, roomName: string, role?: string) => void;
  sendMessage: (userName: string, roomName: string, message: string) => void;
};
