export interface ServerMessageType {
  msg: string;
  timeStamp: string;
  userName: string;
}

export interface ServerRoomParticipantType {
  name: string;
  role: string;
}

export interface ServerRoomType {
  messages: ServerMessageType[];
  participants: ServerRoomParticipantType[];
  [key: string]: unknown;
}
