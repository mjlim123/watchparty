import React from 'react';
import { useContext, useRef } from 'react';
import { RoomContext } from '../contexts/RoomContext';


export default function RoomNavbar({ roomCode, resultsRef }) {


    const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
    const { searchQuery, setSearchQuery, setSearchResults } = useContext(RoomContext);

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

    return (
        <div className="navbar fixed top-0 left-0 w-full z-50 bg-[#1E293B] flex justify-between items-center p-4">
            <div className="flex items-center gap-4">
                <a href="/" className="pl-5 opacity-80 transition duration-300 text-3xl font-bold 
                    hover:scale-110 hover:rotate-2 hover:text-blue-500 hover:shadow-lg">
                    Watchparty
                </a>
                <form onSubmit={searchYoutube} className="absolute left-1/2 transform -translate-x-1/2 w-[500px]">
                    <label className="input w-[500px] flex items-center border border-gray-600 rounded-md px-3 bg-[#161B22]">
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

            </div>
            <div className="flex items-center">
                <p className='text-[#E5E7EB] text-2xl'>Room Code:</p>
                <p className="text-[#E5E7EB] text-2xl font-bold px-2"> {roomCode}</p>
            </div>
        </div>

    )
}

