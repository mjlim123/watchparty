import { useContext, useEffect } from "react";
import { RoomContext } from "../contexts/RoomContext";
import he from 'he';
import { get, remove } from "../apiService";


export default function Playlist() {

    const { playlist, setCurrentVideo, setPlaylist, room, connection } = useContext(RoomContext);


    const handleVideoSelect = (video) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        connection.send(`/app/room/${room.room_code}/change`, {}, JSON.stringify({ videoUrl: video.video_url }));
    }

    const removeFromPlaylist = (videoToRemove) => {
        connection.send(`/app/room/${room.room_code}/delete`, {} ,JSON.stringify({ videoId: videoToRemove.video_id, playlistId: room.playlistId })
        );
        // setPlaylist((prev) => prev.filter((video) => video.video_id !== videoToRemove.video_id));
        // remove('video', `${videoToRemove.video_id}/${room.playlistId}`)
    };


    return (
        <div className={playlist.length > 0 ? '' : ''}>
            {playlist.length > 0 ? (
                <div className='h-[80vh] bg-[#161B22]'>
                    {playlist.map((result) => (
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