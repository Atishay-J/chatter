import './App.css';
import CreateRoomPage from './components/CreateRoomPage';
import { Route, Routes } from 'react-router-dom';
import RoomPage from './components/RoomPage';
import JoinRoomPage from './components/JoinRoomPage';
import KickedOutPage from './components/KickedOutPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<CreateRoomPage />} />
      <Route path="/room/:roomName" element={<RoomPage />} />
      <Route path="/join/:roomName" element={<JoinRoomPage />} />
      <Route path="/kickout" element={<KickedOutPage />} />
    </Routes>
  );
}

export default App;
