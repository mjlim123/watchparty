import { createContext, useState } from "react";

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [playlist, setPlaylist] = useState([]);


    return (
        <RoomContext.Provider
            value={{
                searchQuery,
                setSearchQuery,
                searchResults,
                setSearchResults,
                currentVideo,
                setCurrentVideo,
                playlist,
                setPlaylist
            }}
        >
            {children}
        </RoomContext.Provider>
    );
};
