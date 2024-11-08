import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getRandomEmoji } from "../../utils/emojies";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";

const Conversations = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/v1/users");
        const data = await response.data;
        if (data.error) {
          throw new Error(data.error);
        }
        // Add a unique emoji to each user when data is initially loaded
        const usersWithEmojis = data.map((user) => ({
          ...user,
          emoji: getRandomEmoji(), // Assign a random emoji once per user
        }));
        setUsers(usersWithEmojis);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);

  return (
    <>
      {users.map((user) => (
        <div key={user._id}>
          <div
            className={`flex gap-2 items-center rounded p-2 py-1 cursor-pointer hover:bg-sky-600 ${
              selectedConversation?._id === user._id ? "bg-sky-500" : ""
            }`}
            onClick={() => setSelectedConversation(user)}
          >
            <div
              className={`avatar ${
                onlineUsers.includes(user._id) ? "online" : ""
              }`}
            >
              <div className="w-14 rounded-full">
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <img
                    src={user.profilePic}
                    alt={`${user.fullName}'s profile`}
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex gap-3 justify-between">
                <p className="text-lg font-semibold text-gray-200 capitalize">
                  {user.fullName}
                </p>
                <span className="text-lg">{user.emoji}</span>{" "}
                {/* Use stored emoji */}
              </div>
            </div>
          </div>
          {users.indexOf(user) !== users.length - 1 ? (
            <div className="divider py-0 my-0 h-1"></div>
          ) : (
            ""
          )}
        </div>
      ))}
    </>
  );
};

export default Conversations;
