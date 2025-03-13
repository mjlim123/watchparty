import React, { createContext, useState, useContext } from "react";

export const RoomContext = createContext();

export const RoomProvider = ({children}) => {
    const [room, setRoom] = useState(null);
}