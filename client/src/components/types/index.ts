export interface ServerMessageType {
  msg: string;
  timeStamp: string;
  userName: string;
  userId: string;
}

export interface ServerRoomParticipantType {
  name: string;
  role: string;
  userId: string;
  blockList?: string[];
}

export interface ServerRoomType {
  messages: ServerMessageType[];
  participants: ServerRoomParticipantType[];
  [key: string]: unknown;
}
