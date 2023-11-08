export interface ChatMessageWithIds {
  msg: string;
  timeStamp: string;
  userName: string;
  userId: string;
}

export type UserRole = string;

export interface UserData {
  userName: string;
  userId: string;
  role: UserRole;
}

export interface RoomData {
  participants: UserData[];
  messages: ChatMessageWithIds[];
  roomName: string;
}

export interface ServerHistory {
  [key: string]: RoomData;
}