import { useEffect, useState } from 'react';
import './App.css';
import { io } from 'socket.io-client';

const isDevEnv = import.meta.env.DEV;

const socket = io(isDevEnv ? 'http://localhost:8080' : '');

function App() {
  const [input, setInput] = useState('');
  const [roomName, setRoomName] = useState('');

  const sendMsg = () => {
    socket.emit('chat message', 'sdfdsf', roomName, { msg: input });
  };

  const joinRoom = () => {
    console.log('should join room', socket);
    socket.emit('join room', 'sdfdsf', roomName, 'DEN');
  };

  useEffect(() => {
    socket.on('new message', (...args) => console.log('New Message', args));
    socket.on('user joined', (...args) => console.log('user joined', args));
  }, []);

  return (
    <>
      <h1>App</h1>
      <input
        type="text"
        name="room"
        id="room"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <input
        type="text"
        name="chat"
        id="chat"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={joinRoom}>Join Room</button>
      <button onClick={sendMsg}>Send Msg</button>
      <button></button>
    </>
  );
}

export default App;
