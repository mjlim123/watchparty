
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import Home from './pages/Home';
import Room from './pages/Room';
import { RoomProvider } from "./contexts/RoomContext";

function App() {

  window.global = window;

  return (
    <RoomProvider>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/room/:code" element={<Room />} />
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </Router>

    </RoomProvider>
  )
}

export default App
