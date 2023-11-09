import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { SocketContextProvider } from './components/contexts/SocketContext/index.tsx';
import { BrowserRouter } from 'react-router-dom';
import { RoomContextProvider } from './components/contexts/RoomContext/index.tsx';
import { UserContextProvider } from './components/contexts/UserContext/index.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <SocketContextProvider>
          <RoomContextProvider>
            <UserContextProvider>
              <App />
            </UserContextProvider>
          </RoomContextProvider>
        </SocketContextProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
