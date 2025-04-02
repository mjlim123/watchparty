import { forwardRef, useContext, useEffect } from "react";
import { RoomContext } from "../contexts/RoomContext";
import he from 'he';
import { get, remove, put } from "../apiService";
import SkipNext from "../assets/skip-next.svg";
import Shuffle from "../assets/shuffle.svg";



export default function Playlist() {

    const { 
        playlist, setPlaylist,
        setCurrentVideo, currentVideo,
        room, connection,
        setIsUsingPlaylist,
        isShuffle, setIsShuffle } = useContext(RoomContext);


    const handleVideoSelect = async (video) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setIsUsingPlaylist(true);
        put('room', `/${room.room_id}/usingPlaylist?isUsingPlaylist=true`)
        put('room', `/${room.room_id}/video?videoId=${video.video_id}`)
            .then(data => { setCurrentVideo(data) });
        // await put('room', `/${room.playlistId}/video?videoURL=${video.video_url}`);
        const index = playlist.videos.findIndex((v) => v.video_id === video.video_id);
        await put('playlist', `/${room.playlistId}/position/?number=${index}`);
        connection.send(`/app/room/${room.room_code}/change`, {}, JSON.stringify(video));
    }

    const removeFromPlaylist = (videoToRemove) => {
        connection.send(`/app/room/${room.room_code}/delete`, {}, JSON.stringify({ videoId: videoToRemove.video_id, playlistId: room.playlistId })
        );
        // setPlaylist((prev) => prev.filter((video) => video.video_id !== videoToRemove.video_id));
        // remove('video', `${videoToRemove.video_id}/${room.playlistId}`)
    };

    const handleSkipNext = async () => {
        const index = playlist.videos.findIndex((v) => v.video_id === currentVideo.video_id);
        if (isShuffle) {
            const randomIndex = Math.floor(Math.random() * playlist.videos.length);
            await put('playlist', `/${room.playlistId}/position/?number=${playlist.videos[randomIndex].video_id}`);
            await put ('room', `/${room.room_id}/video?videoId=${playlist.videos[randomIndex].video_id}`);
            connection.send(`/app/room/${room.room_code}/change`, {}, JSON.stringify(playlist.videos[randomIndex]));
        } else {
            if (index + 1 < playlist.videos.length) {
                await put('playlist', `/${room.playlistId}/position/?number=${playlist.videos[index + 1].video_id}`);
                await put ('room', `/${room.room_id}/video?videoId=${playlist.videos[index + 1].video_id}`);
                connection.send(`/app/room/${room.room_code}/change`, {}, JSON.stringify(playlist.videos[index + 1]));
            } else {
                await put('playlist', `/${room.playlistId}/position/?number=0`);
                await put ('room', `/${room.room_id}/video?videoId=${playlist.videos[0].video_id}`);
                connection.send(`/app/room/${room.room_code}/change`, {}, JSON.stringify(playlist.videos[0]));
            }
        }
    };

    const handleShuffleToggle = () => {
        connection.send(`/app/room/${room.room_code}/toggleShuffle`, {}, JSON.stringify({ isShuffle: !isShuffle }));
    }

    const handleShuffle = async () => {
        
    }


    return (
        <div className={playlist !== null ? '' : ''}>
            {playlist !== null ? (
                <div className='h-[80vh] bg-[#161B22]'>
                    <div className="flex items-center">
                        <button onClick={handleSkipNext} className="flex items-center space-x-2">
                            <img
                                src={SkipNext}
                                alt="Skip Next"
                                className="w-10 h-10 transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                            />
                        </button>
                        <button onClick={handleShuffleToggle} className="flex items-center space-x-2">
                            <img
                                src={Shuffle}
                                alt="Shuffle"
                                className={`w-6 h-6 transition-all duration-300 ${
                                    isShuffle ? 'drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]' : ''
                                }`}
                            />
                        </button>
                    </div>
    
                    {playlist.videos.map((result) => (
                        <div
                            onClick={() => handleVideoSelect(result)}
                            key={result.video_id}
                            className="transition duration-300 hover:bg-[#1E293B] hover:shadow-[0_0_15px_#2563EB] 
                                           bg-[#161B22] flex items-center gap-6 p-2 border-b border-[#374151] 
                                           last:border-b-0 cursor-pointer"
                        >
                            <div className="flex items-center gap-4 flex-grow">
                                <img src={result.thumbnail_url} alt="thumbnail" className="w-15 h-12" />
                                <h2 className='text-[#E5E7EB]'>{he.decode(result.title)}</h2>
                            </div>
                            <button
                                className="btn bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-3 py-1 rounded-md"
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevents triggering video selection
                                    removeFromPlaylist(result);
                                }}
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center h-[80vh] bg-[#161B22] p-6">
                    <p>Playlist is empty.</p>
                </div>
            )}
        </div>
    )




}