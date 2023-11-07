import { useEffect, useState } from 'react';
import './App.css';
import { io } from 'socket.io-client';
import { useSocketContext } from './components/contexts/SocketContext';
import CreateRoomPage from './components/CreateRoomPage';

function App() {
  const { socket } = useSocketContext();

  useEffect(() => {
    socket.on('new message', (...args) => console.log('New Message', args));
    socket.on('user joined', (...args) => console.log('user joined', args));
  }, []);

  return (
    <>
      <CreateRoomPage />
    </>
  );
}

export default App;
