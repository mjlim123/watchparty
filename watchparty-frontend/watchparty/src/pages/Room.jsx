import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { over } from "stompjs";  


export default function Room() {

    const { code } = useParams();
    const [input, setInput] = useState('');


    const [user, setUser] = useState('');
    const [connection, setConnection] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState([]);

    const [showModal, setShowModal] = useState(true);
    const handleClose = () => setShowModal(false);

    const opts = {
        height: window.innerHeight * .7,
        width: window.innerWidth * .6,
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };


    const handleSubmit = (e) => {
        e.preventDefault()
        setUser(input);
        setShowModal(false);
    }

    useEffect(() => {
        if (user) {
            const socket = new SockJS("http://localhost:8080/ws");
            const connection = over(socket);
            connection.debug = () => {};

            connection.connect({}, () => {
                connection.subscribe(`/topic/room/${code}`, (response) => {
                    const message = JSON.parse(response.body);
                    setMessages((prev) => [...prev, message]);
                });
            });
        
            setConnection(connection);
        }

    },[user])

    return (
        <div>
            <div className="flex flex-row min-h-screen justify-center items-center">
                <div className="w-[60vw] h-[70vh] bg-black">

                </div>
        
            </div>
        </div>
    )
}