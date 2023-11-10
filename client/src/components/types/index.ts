export interface ServerMessageType {
  msg: string;
  timeStamp: string;
  userName: string;
  userId: string;
}

export interface ServerRoomParticipantType {
  userName: string;
  role: string;
  userId: string;
  blockList?: string[];
  status?: 'online' | 'offline';
}

export interface ServerRoomType {
  messages: ServerMessageType[];
  participants: ServerRoomParticipantType[];
  roomName: string;
  [key: string]: unknown;
}
