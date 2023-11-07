import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { SocketContextProvider } from './components/SocketContext/index.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);
