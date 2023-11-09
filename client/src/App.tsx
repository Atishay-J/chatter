import { useEffect, useState } from 'react';
import './App.css';
import { useSocketContext } from './components/contexts/SocketContext';
import CreateRoomPage from './components/CreateRoomPage';
import { Route, Routes } from 'react-router-dom';
import RoomPage from './components/RoomPage';
import JoinRoomPage from './components/JoinRoomPage';

function App() {
  const { socket, socketServer } = useSocketContext();

  useEffect(() => {
    socket.on('new message', (...args) => console.log('New Message', args));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<CreateRoomPage />} />
      <Route path="/room/:roomName" element={<RoomPage />} />
      <Route path="/join/:roomName" element={<JoinRoomPage />} />
    </Routes>
  );
}

export default App;
