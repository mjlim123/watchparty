import React from 'react';
import { useContext, useRef } from 'react';
import { RoomContext } from '../contexts/RoomContext';
import he from 'he';
import { post } from '../apiService';

export default function SearchResults({resultsRef}) {


    const { searchResults, currentVideo, setCurrentVideo, setPlaylist, playlist, room, connection } = useContext(RoomContext);

    const handleVideoSelect = (videoId) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        
        connection.send(`/app/room/${room.room_code}/change`, {}, JSON.stringify({ videoUrl: videoId }));
    }

    const handleAddToPlaylist = async (video, e) => {
        e.stopPropagation();
        console.log(video.snippet.thumbnails.high.url);
        const videoObject = {
            "title" : video.snippet.title,
            "video_url" : video.id.videoId,
            "thumbnail_url" : video.snippet.thumbnails.high.url,
            "playlistId" : room.playlistId
        }
        const response = await post('video', videoObject, `/${room.playlistId}`);
        console.log(response);
        connection.send(`/app/room/${room.room_code}/add`, {} , JSON.stringify(videoObject));
        // console.log(response);
        // setPlaylist((prev) => [...prev, response]);
    }
        
    return (
        <div className={searchResults.length > 0 ? 'mx-auto' : ''} ref={resultsRef}> 
            {searchResults.length > 0 ? (
                <div className='w-[40vw] bg-[#1E293B] rounded-lg'>
                    {searchResults.map((result) => (
                        <div onClick={() => handleVideoSelect(result.id.videoId)} key={result.id.videoId} 
                        className="transition duration-300 hover:bg-[#1E293B] 
                        hover:shadow-[0_0_15px_#2563EB] flex items-center gap-6 p-6 border-b border-[#374151] 
                        last:border-b-0 cursor-pointer">
                            <img src={result.snippet.thumbnails.high.url} alt="" className="w-30 h-30" />
                            <div>
                                <h2 className='text-[#E5E7EB]'>{he.decode(result.snippet.title)}</h2>
                                <p className='text-[#E5E7EB]'>{result.snippet.channelTitle}</p>
                                <button onClick={(e) => handleAddToPlaylist(result, e)} className='btn'>Add to playlist</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                null
            )}

        </div>
    )
}