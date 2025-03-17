import { useNavigate } from "react-router";
import { post } from "../apiService";
import { useState } from "react";


export default function Home() {

    let navigate = useNavigate();
    
    const [modalType, setModalType] = useState(null);

    const [roomName, setRoomName] = useState('');
    const [joinCode, setJoinCode] = useState('');

    const handleShowJoin = () => {
        setModalType("join");
        document.getElementById('my_modal').showModal()
        
      };

      const handleShowCreate = () => {
        setModalType("create");
        document.getElementById('my_modal').showModal()
        
      };


    const handleCreateRoomChange = (e) => setRoomName(e.target.value);
    const handleJoinRoomChange = (e) => setJoinCode(e.target.value);

    const handleCreateRoomSubmit = async (e) => {
        e.preventDefault();
        post('room', { room_name: roomName }, )
            .then((data) => {
                navigate(`/room/${data.room_code}`);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                document.getElementById('my_modal').close()
            });
    }

    const handleJoinRoomSubmit = async (e) => {
        e.preventDefault();
        navigate(`/room/${joinCode}`);
    }

    return (
        <div>
            <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden">
                <div className="text-center text-white">
                    <p className="text-6xl font-bold mb-4 animate-bounce">
                        Welcome to Watchparty
                    </p>
                    <p className="text-xl mb-8">
                        Watch YouTube videos with your friends in real-time
                    </p>
                    <div className="flex justify-center gap-2">
                        <button onClick={handleShowCreate} className="btn animate-pulse bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-100 transition duration-300">
                            Get Started
                        </button>
                        <button onClick={handleShowJoin} className="btn animate-pulse bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-100 transition duration-300">
                            Join Room
                        </button>
                    </div>
                </div>
            </div>
            <dialog id="my_modal" className="modal">
                <div className="modal-box w-full max-w-md">
                    <h3 className="font-bold text-lg">{modalType === "join" ? "Join room" : "Create room"}</h3>
                    <fieldset className="fieldset mt-1">
                        <legend className="text-base fieldset-legend">{modalType === "join" ? "Enter room code" : "Enter room name"}</legend>
                        <input onChange={modalType === "join" ? handleJoinRoomChange : handleCreateRoomChange} type="text" className="input h-[40px]" placeholder="Room name" />

                    </fieldset>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                        <form method="dialog" onSubmit={modalType === "join" ? handleJoinRoomSubmit : handleCreateRoomSubmit}>
                            <button type="submit" className="btn">Submit</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}