import React from 'react';
import { useContext, useRef, useState } from 'react';
import { RoomContext } from '../contexts/RoomContext';
import { post } from '../apiService';


export default function RoomNavbar({ roomCode, resultsRef }) {


    const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
    const { searchQuery, setSearchQuery,
        setSearchResults,
        setPlaylist, playlist,
        room, connection } = useContext(RoomContext);

    const [input, setInput] = useState("");

    const searchYoutube = async (e) => {
        e.preventDefault();
        console.log(searchQuery)
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&type=video&order=relevance&q=${searchQuery}&key=${API_KEY}`);
        const data = await response.json();
        const filteredResults = data.items.filter((item) => item.id.kind === "youtube#video");
        setSearchResults(filteredResults);

        setTimeout(() => {
            resultsRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }

    const importPlaylist = () => {
        document.getElementById('playlist_modal').showModal();
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        document.getElementById('playlist_modal').close();
        let playlist_code = input.split('list=')[1].split('&')[0];
        let allVideos = [];
        let nextPageToken = "";

        do {
            const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${playlist_code}&maxResults=50&pageToken=${nextPageToken}&key=${API_KEY}`;

            try {
                const response = await fetch(url);
                const data = await response.json();

                data.items.forEach(item => {
                    if (item.snippet.title !== "Deleted video") {
                        const video = {
                            title: item.snippet.title,
                            video_url: item.contentDetails.videoId,
                            thumbnail_url: item.snippet.thumbnails.high.url,
                            playlistId: room.playlistId,
                        };
                        allVideos.push(video);
                    };
                });

                nextPageToken = data.nextPageToken || "";
            } catch (error) {
                console.error("Error fetching playlist:", error);
                break;
            }
        } while (nextPageToken);

        console.log(allVideos);

        post('video', allVideos, `/batch/${room.playlistId}`)
            .then(data => { console.log(data) })
            .then(() => { connection.send(`/app/room/${room.room_code}/add`, {}, JSON.stringify({ "playlistId": room.playlistId })); });

        setInput("");

    }

    return (
        <div className="navbar fixed top-0 left-0 w-full z-50 bg-[#1E293B] flex justify-between items-center p-4">
            {/* Import Playlist Modal */}
            <dialog id="playlist_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Import playlist</h3>
                    <fieldset className="fieldset mt-1">
                        <legend className="text-base fieldset-legend">Enter playlist URL</legend>
                        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" className="input h-[40px]" placeholder="Enter URL"></input>
                    </fieldset>
                    <div className="modal-action">
                        <form method="dialog" onSubmit={handleSubmit}>
                            <button type="submit" className="btn opacity-80 hover:opacity-100 transition duration-300">Submit</button>
                        </form>
                    </div>
                </div>
            </dialog>

            {/* Left Section */}
            <div className="flex items-center gap-4 min-w-0">
                <a href="/" className="pl-5 opacity-80 transition duration-300 text-3xl font-bold 
            hover:scale-110 hover:rotate-2 hover:text-blue-500 hover:shadow-lg">
                    Watchparty
                </a>
            </div>

            {/* Center Section: Search Bar & Import Playlist */}
            <div className="flex items-center gap-2 flex-1 justify-center">
                {/* Search Bar */}
                <form onSubmit={searchYoutube} className="flex items-center flex-1 max-w-[500px]">
                    <label className="input flex items-center border border-gray-600 rounded-md px-3 bg-[#161B22] w-full">
                        <input
                            onChange={(e) => setSearchQuery(e.target.value)}
                            type="search"
                            placeholder="Search"
                            className="w-full bg-transparent focus:outline-none text-white"
                        />
                        <svg
                            className="cursor-pointer h-[1em] opacity-50 hover:opacity-100 transition duration-200"
                            type="submit"
                            onClick={searchYoutube}
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5"
                                fill="none" stroke="currentColor">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                    </label>
                </form>

                {/* Import Playlist Button */}
                <button onClick={importPlaylist} className="btn">Import Playlist</button>
            </div>

            {/* Right Section: Room Code */}
            <div className="flex items-center gap-4 min-w-0">
                <p className='text-[#E5E7EB] text-lg sm:text-2xl'>Room Code:</p>
                <p className="text-[#E5E7EB] font-bold px-2 text-lg sm:text-2xl"> {roomCode}</p>
            </div>
        </div>





    )
}

