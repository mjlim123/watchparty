import React, { useEffect, useState, useContext, useRef, act } from "react";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import RoomNavbar from "../components/RoomNavbar";
import { get, post, remove } from "../apiService";
import SearchResults from "../components/SearchResults";
import YouTube from "react-youtube";
import { RoomContext } from "../contexts/RoomContext";
import Playlist from "../components/Playlist";

const URL = import.meta.env.VITE_API_URL;




export default function Room() {
    const { code } = useParams();
    const { setCurrentVideo, currentVideo,
            room,setRoom,
            playlist, setPlaylist,
            connection, setConnection,
            currentTime, setCurrentTime,
            targetRef } = useContext(RoomContext);

    const [input, setInput] = useState('');

    const resultsRef = useRef(null);
    const playerRef = useRef(null);
    const lastSeekTimeRef = useRef(0);

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
        console.log("GETTING PLAYLIST");
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
            console.log(room)
            console.log("GETTING PLAYLIST");
            get('playlist', `${room.playlistId}`).then((data) => setPlaylist(data.videos));
        }
    
    },[room])


    useEffect(() => {
        if (user) {
            get('room', code).then((data) => setRoom(data));
            const socket = new SockJS(`${URL}/ws`);
            const connection = over(socket);
            connection.debug = () => { };
            setConnection(connection);
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

                connection.subscribe(`/topic/room/${code}/change`, (response) => {
                    console.log("CHANGE VIDEO!");
                    const videoURL = JSON.parse(response.body);
                    handlePlayVideo(videoURL);
                });

                connection.subscribe(`/topic/room/${code}/pause`, (response) => {
                    console.log("pause")
                    const action = JSON.parse(response.body);
                    playerRef.current.pauseVideo();
                });

                connection.subscribe(`/topic/room/${code}/play`, (response) => {
                    console.log("play")
                    const action = JSON.parse(response.body);
                    playerRef.current.playVideo();
                });

                connection.subscribe(`/topic/room/${code}/seek`, (response) => {
                    const action = JSON.parse(response.body);
                    console.log("seek to: ", action.time);
                    playerRef.current.seekTo(action.time);
                });
            
            });
        }

    }, [user])

    return (
        <div className="bg-[#121212] min-h-screen flex flex-col">
            <RoomNavbar roomCode={code} resultsRef={resultsRef} />
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
                        </div> :
                        <YouTube
                            opts={opts}
                            videoId={currentVideo}
                            onReady={(e) => (playerRef.current = e.target)}
                            onPause={(e) => {
                                if (connection) {
                                    connection.send(
                                        `/app/room/${room.room_code}/pause`,
                                        {},
                                        JSON.stringify({ action: "pause" })
                                    );
                                }
                            }}
                            onPlay={(e) => {
                                connection.send(
                                    `/app/room/${room.room_code}/play`,
                                    {},
                                    JSON.stringify({ action: "play" })
                                );
                            }}
                            onStateChange={(e) => {
                                const newTime = playerRef.current.getCurrentTime();
                                const timeDifference = Math.abs(newTime - lastSeekTimeRef.current);
                        
                                if (e.data === 1 || e.data === 3) { // Playing or Buffering
                                    if (timeDifference > .3) { // Only send if user actually seeks
                                        lastSeekTimeRef.current = newTime; // Update last seek time
                                        if (connection) {
                                            connection.send(
                                                `/app/room/${room.room_code}/seek`,
                                                {},
                                                JSON.stringify({ time: newTime })
                                            );
                                        }
                                    }
                                }
                            }}

                    
                        />
                          
                    }
                </div>

                <div className="sticky top-24 col-start-4 justify-self-end w-[18vw] max-h-[80vh] rounded-lg overflow-y-auto">
                    <Playlist />
                </div>

                {/* Search Results (Immediately Below Video Player) */}
                <div ref={targetRef} className="col-span-3 flex flex-col rounded-lg p-4">
                    <SearchResults resultsRef={resultsRef}/>
                </div>
            </div>
        </div>
    )
}