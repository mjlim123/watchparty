import { createContext, useState, useRef } from "react";

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [playlist, setPlaylist] = useState([]);
    const [room, setRoom] = useState(null);
    const [connection, setConnection] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const targetRef = useRef(null);

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
                setPlaylist,
                room,
                setRoom,
                connection,
                setConnection,
                currentTime,
                setCurrentTime,
            }}
        >
            {children}
        </RoomContext.Provider>
    );
};
