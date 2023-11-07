import { ReactNode, createContext, useContext, useRef } from 'react';
import { io } from 'socket.io-client';
import { Socket } from 'socket.io-client';
import { createSocketMethods } from './socketServerMethods';
import { SocketMethods } from './socketServerMethodsTypes';

export interface SocketCtx {
  socket: Socket;
  socketServer: SocketMethods;
}

const SocketContext = createContext<SocketCtx>({} as SocketCtx);

export const SocketContextProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const isDevEnv = import.meta.env.DEV;

  const socketPath = isDevEnv ? 'http://localhost:8080' : '';
  const socketRef = useRef(io(socketPath));
  const socketServerMethods = createSocketMethods(socketRef.current);

  return (
    <SocketContext.Provider
      value={{ socket: socketRef.current, socketServer: socketServerMethods }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  return useContext(SocketContext);
};
