
import { Navigate, Route, Routes, BrowserRouter as Router } from "react-router-dom";
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
          <Route path='/home' element={<Home />}></Route>
          <Route path="/room/:code" element={<Room />}></Route>
          <Route path="/" element={<Navigate to="/home" />}></Route>
        </Routes>
      </Router>
    </RoomProvider>
  )
}

export default App
