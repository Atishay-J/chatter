import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { SocketContextProvider } from './components/contexts/SocketContext/index.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RoomPage from './components/RoomPage/index.tsx';
import { RoomContextProvider } from './components/contexts/RoomContext/index.tsx';
import JoinRoomPage from './components/JoinRoomPage/index.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/room/:roomName',
    element: <RoomPage />
  },
  {
    path: '/join/room/:roomName',
    element: <JoinRoomPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <SocketContextProvider>
        <RoomContextProvider>
          <RouterProvider router={router} />
        </RoomContextProvider>
      </SocketContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);
