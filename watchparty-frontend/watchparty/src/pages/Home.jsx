import { useNavigate } from "react-router";
import { post } from "../apiService";
import ModalForm from "../components/ModalForm";
import { useState, useRef } from "react";


export default function Home() {

    let navigate = useNavigate();
    
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(null);

    const [roomName, setRoomName] = useState('');
    const [joinCode, setJoinCode] = useState('');

    const modalRef = useRef(null);

    const handleClose = () => {
        if (modalRef.current) {
          modalRef.current.close(); // Close the modal
        }
      };



    const handleShowJoin = () => {
        setModalType("join");
        if (modalRef.current) {
          modalRef.current.showModal(); // Open the modal
        }
      };

      const handleShowCreate = () => {
        setModalType("create");
        if (modalRef.current) {
          modalRef.current.showModal(); // Open the modal
        }
      };


    const handleCreateRoomChange = (e) => setRoomName(e.target.value);
    const handleJoinRoomChange = (e) => setJoinCode(e.target.value);

    const handleCreateRoomSubmit = async (e) => {
        e.preventDefault();
        post('room', { room_name: roomName })
            .then((data) => {
                navigate(`/room/${data.room_code}`);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                handleClose();
            });
    }

    const handleJoinRoomSubmit = async (e) => {
        e.preventDefault();
        navigate(`/room/${joinCode}`);
    }

    return (
        <div>
            <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
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
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button>
            <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">Press ESC key or click the button below to close</p>
                <div className="modal-action">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                </form>
                </div>
            </div>
            </dialog>
        </div>
    )
}