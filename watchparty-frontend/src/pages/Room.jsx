import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import RoomNavbar from "../components/RoomNavbar";
import { get, post, remove } from "../apiService";
import SearchResults from "../components/SearchResults";
import YouTube from "react-youtube";
import { RoomContext } from "../contexts/RoomContext";
import Playlist from "../components/Playlist";


export default function Room() {

    const { code } = useParams();
    const { setCurrentVideo, currentVideo, room, setRoom, playlist, setPlaylist, connection, setConnection } = useContext(RoomContext);

    const [input, setInput] = useState('');


    const [user, setUser] = useState('');

    const opts = {
        height: window.innerHeight * 0.8,
        width: window.innerWidth * 0.81,
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };


    const handleSubmit = (e) => {
        e.preventDefault()
        setUser(input);
        document.getElementById('my_modal').close();
    }

    function handleAddToPlaylist(video){
        get('playlist', `${video.playlistId}`).then((data) => setPlaylist(data.videos));
    }

    function handleDelete(videoId, playlistId){
        remove('video', `${videoId}/${playlistId}`);
        setPlaylist((prev) => prev.filter((video) => video.video_id !== videoId));
    }

    function handlePlayVideo(videoURL){
        console.log("PLAYING VIDEO: ", videoURL);
        console.log(room);
        setCurrentVideo(videoURL.videoUrl);
    }

    useEffect(() => {
        document.getElementById('my_modal').showModal()
    }, [])

    useEffect(() => {
        if (room) {
            get('playlist', `${room.playlistId}`).then((data) => setPlaylist(data.videos));
            connection.connect({}, () => {
                connection.subscribe(`/topic/room/${code}/delete`, (response) => {
                    console.log("DELETE VIDEO!");
                    const videoId = JSON.parse(response.body).videoId;
                    const playlistId = JSON.parse(response.body).playlistId;
                    handleDelete(videoId, playlistId);
                });

                connection.subscribe(`/topic/room/${code}/add`, (response) => {
                    console.log("ADD VIDEO!");
                    const video = JSON.parse(response.body);
                    handleAddToPlaylist(video);
                });

                connection.subscribe(`/topic/room/${code}/play`, (response) => {
                    console.log("PLAY VIDEO!");
                    const videoURL = JSON.parse(response.body);
                    handlePlayVideo(videoURL);
                });
            
            });
        }
        
    },[room])

    useEffect(() => {
        if (user) {
            get('room', code).then((data) => setRoom(data));
            const socket = new SockJS("http://localhost:8080/ws");
            const connection = over(socket);
            connection.debug = () => { };
            setConnection(connection);
        }

    }, [user])


    return (
        <div className="bg-[#121212] min-h-screen flex flex-col">
            <RoomNavbar roomCode={code} />
            <dialog id="my_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <fieldset className="fieldset mt-1">
                        <legend className="text-base fieldset-legend">Enter username</legend>
                        <input onChange={(e) => setInput(e.target)} type="text" className="input h-[40px]" placeholder="Username" />
                    </fieldset>
                    <div className="modal-action">
                        <form method="dialog" onSubmit={handleSubmit}>
                            <button type="submit" className="btn opacity-80 hover:opacity-100 transition duration-300">Submit</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <div className="mt-[90px] grid grid-cols-4 grid-rows-[auto_1fr] gap-4">
                {/* Video Player (Larger) */}
                <div className="col-span-3 h-[80vh] w-[81vw] rounded-lg">
                    {currentVideo === null ?
                        <div className="flex flex-row min-h-[70vh] justify-center items-center">
                            <h1 className="text-6xl">Search a video to get started!</h1>
                            <button onClick={()=> console.log(room)}>CLICK HERE</button>
                        </div> :
                        <YouTube
                            opts={opts}
                            videoId={currentVideo} />
                    }
                </div>

                <div className="col-start-4 justify-self-end w-[18vw] max-h-[80vh] rounded-lg overflow-y-auto">
                    <Playlist />
                </div>

                {/* Search Results (Immediately Below Video Player) */}
                <div className="col-span-3 flex flex-col rounded-lg p-4">
                    <SearchResults />
                </div>
                <button onClick={()=> console.log(room)}> CLICK HERE</button>
            </div>
        </div>
    )
}