import React, { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

// Just use the raw URL string
const SOCKET_SERVER_URL = import.meta.env.VITE_BASE_URL;

const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);

  useEffect(() => {
    console.log("🌐 Connecting to socket at:", SOCKET_SERVER_URL);

    // Now call io() here using the string
    socketRef.current = io(SOCKET_SERVER_URL);

    socketRef.current.on("connect", () => {
      console.log("✅ Socket connected:", socketRef.current.id);
    });

    socketRef.current.on("disconnect", (reason) => {
      console.log("❌ Socket disconnected. Reason:", reason);
    });

    socketRef.current.on("connect_error", (err) => {
      console.error("🚨 Connection error:", err.message);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        console.log("🛑 Socket manually disconnected");
      }
    };
  }, []);

  const sendMessage = (eventName, data) => {
    if (socketRef.current && socketRef.current.connected) {
      console.log(`📤 Sending event "${eventName}" with data:`, data);
      socketRef.current.emit(eventName, data);
    } else {
      console.warn("⚠️ Cannot send message, socket not connected");
    }
  };

  const onMessage = (eventName, callback) => {
    if (socketRef.current) {
      console.log(`📥 Listening for "${eventName}" events`);
      socketRef.current.on(eventName, callback);
    }

    return () => {
      if (socketRef.current) {
        console.log(`🧹 Removing listener for "${eventName}"`);
        socketRef.current.off(eventName, callback);
      }
    };
  };

  return (
    <SocketContext.Provider value={{ sendMessage, onMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
