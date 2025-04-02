import React, { useEffect, useState, useContext, useRef, act } from "react";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import RoomNavbar from "../components/RoomNavbar";
import { get, post, put, remove } from "../apiService";
import SearchResults from "../components/SearchResults";
import YouTube from "react-youtube";
import { RoomContext } from "../contexts/RoomContext";
import Playlist from "../components/Playlist";

const URL = import.meta.env.VITE_API_URL;


export default function Room() {
    const { code } = useParams();
    const { setCurrentVideo, currentVideo,
        room, setRoom,
        playlist, setPlaylist,
        connection, setConnection,
        currentTime, setCurrentTime,
        targetRef,
        playlistPosition, setPlaylistPosition,
        isUsingPlaylist, setIsUsingPlaylist,
        setIsShuffle, isShuffle } = useContext(RoomContext);

    const [input, setInput] = useState('');

    const resultsRef = useRef(null);
    const playerRef = useRef(null);
    const lastSeekTimeRef = useRef(0);
    const playIntervalRef = useRef(null);

    const [user, setUser] = useState('');

    const opts = {
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

    function handleAddToPlaylist(video) {
        console.log("GETTING PLAYLIST");

        get('playlist', `${video.playlistId}`).then((data) => setPlaylist(data));
    }

    function handleDelete(videoId, playlistId) {
        remove('video', `${videoId}/${playlistId}`);
        setPlaylist((prev) => ({
            ...prev,
            videos: prev.videos.filter((video) => video.video_id !== videoId),
        }));
    }

    function handlePlayVideo(video) {
        console.log(video);
        setCurrentVideo(video);
    }

    function handleShuffle(action) {
        console.log(action);
        put('room', `/${room.room_id}/toggleShuffle?state=${action}`)
        .then((data) => setIsShuffle(data.toggle_shuffle));
    }

    useEffect(() => {
        document.getElementById('my_modal').showModal();
    }, [])

    useEffect(() => {
        if (room) {
            setCurrentTime(room.current_video_time);
            setCurrentVideo(room.current_video ? room.current_video : null);
            setIsUsingPlaylist(room.using_playlist);
            setIsShuffle(room.toggle_shuffle);

            const socket = new SockJS(`${URL}/ws`);
            const connection = over(socket);
            connection.debug = () => { };
            setConnection(connection);
            connection.connect({}, () => {
                connection.subscribe(`/topic/room/${code}/delete`, (response) => {
                    const videoId = JSON.parse(response.body).videoId;
                    const playlistId = JSON.parse(response.body).playlistId;
                    handleDelete(videoId, playlistId);
                });

                connection.subscribe(`/topic/room/${code}/add`, (response) => {
                    const video = JSON.parse(response.body);
                    handleAddToPlaylist(video);
                });

                connection.subscribe(`/topic/room/${code}/change`, (response) => {
                    const video = JSON.parse(response.body);
                    handlePlayVideo(video);
                });

                connection.subscribe(`/topic/room/${code}/pause`, (response) => {
                    const action = JSON.parse(response.body);
                    playerRef.current.pauseVideo();
                });

                connection.subscribe(`/topic/room/${code}/play`, (response) => {
                    const action = JSON.parse(response.body);
                    playerRef.current.playVideo();
                });

                connection.subscribe(`/topic/room/${code}/seek`, (response) => {
                    const action = JSON.parse(response.body);
                    playerRef.current.seekTo(action.time);
                });

                connection.subscribe(`/topic/room/${code}/toggleShuffle`, (response) => {
                    const action = JSON.parse(response.body).isShuffle;
                    handleShuffle(action);
                });
            });
        }

    }, [room])


    useEffect(() => {
        if (user) {
            get('room', code).then((data) => {
                setRoom(data);
                return get('playlist', `${data.playlistId}`);
            }).then((playlistData) => {
                setPlaylist(playlistData);
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
                {/* <button onClick={()=> console.log(currentVideo)}>CURRENT VIDEO!!!</button> */}
                {/* Video Player (Larger) */}
                <div className="col-span-3 h-[80vh] w-[81vw] rounded-lg">
                    {currentVideo === null ? (
                        <div className="flex flex-row min-h-[70vh] justify-center items-center">
                            <h1 className="text-6xl">Search a video to get started!</h1>
                        </div>
                    ) : (
                        <div className="w-full h-full flex justify-center items-center bg-[#161B22]">
                            <div className="w-full h-full">
                                <YouTube
                                    className="w-full h-full"
                                    opts={{
                                        width: "100%",
                                        height: "100%",
                                        playerVars: {
                                            autoplay: 1,
                                        },
                                    }}
                                    videoId={currentVideo.video_url}
                                    onReady={(e) => {
                                        console.log("READY!!");
                                        playerRef.current = e.target;
                                        e.target.seekTo(currentTime);
                                    }}
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
                                        let newTime = playerRef.current.getCurrentTime();
                                        const timeDifference = Math.abs(newTime - lastSeekTimeRef.current);

                                        if (e.data === 1) { // Playing
                                            console.log("PLAYING!!");

                                            // Start interval if not already running
                                            if (!playIntervalRef.current) {
                                                playIntervalRef.current = setInterval(() => {
                                                    newTime = playerRef.current.getCurrentTime();
                                                    put('room', `/${room.playlistId}/time?videoTime=${newTime}`);
                                                }, 1000);
                                            }
                                        } else {
                                            // Clear interval when video is paused/stopped
                                            if (playIntervalRef.current) {
                                                clearInterval(playIntervalRef.current);
                                                playIntervalRef.current = null;
                                            }
                                        }
                                        if (e.data === 1 || e.data === 3) { // Playing or Buffering
                                            if (timeDifference > 1) {
                                                lastSeekTimeRef.current = newTime;
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
                                    onEnd={(e) => {
                                        put('room', `/${room.playlistId}/time?videoTime=0`).then(() => setCurrentTime(0));
                                        if (isUsingPlaylist && playlist.videos.length > 0) {
                                            let nextVideo;

                                            if (isShuffle) {
                                                const remainingVideos = playlist.videos.filter(v => v.video_id !== currentVideo.video_id);
                                                nextVideo = remainingVideos[Math.floor(Math.random() * remainingVideos.length)];
                                            } else {
                                                const index = playlist.videos.findIndex(video => video.video_id === currentVideo.video_id);
                                                if (index + 1 < playlist.videos.length) {
                                                    nextVideo = playlist.videos[index + 1];
                                                } else {
                                                    nextVideo = playlist.videos[0];
                                                }
                                            }

                                            if (nextVideo) {
                                                setTimeout(() => {
                                                    connection.send(`/app/room/${room.room_code}/change`, {}, JSON.stringify(nextVideo));
                                                    put('room', `/${room.room_id}/video?videoId=${nextVideo.video_id}`);
                                                }, 1000);
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="sticky top-24 col-start-4 justify-self-end w-[18vw] max-h-[80vh] rounded-lg overflow-y-auto">
                    <Playlist />
                </div>

                {/* Search Results (Immediately Below Video Player) */}
                <div ref={targetRef} className="col-span-3 flex flex-col rounded-lg p-4">
                    <SearchResults resultsRef={resultsRef} />
                </div>
            </div>
        </div>
    )
}