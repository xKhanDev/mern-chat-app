import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();
export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();
  useEffect(() => {
    if (authUser) {
      // Initialize socket with userId in the query parameters
      const socketInstance = io("http://localhost:5000", {
        query: {
          userId: authUser._id, // Ensure _id is defined here
        },
      });

      setSocket(socketInstance);
      socketInstance.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      // Clean up the socket connection when the component unmounts
      return () => socketInstance.close();
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
