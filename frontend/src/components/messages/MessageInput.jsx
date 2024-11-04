import React, { useState, useEffect } from "react";
import { GrSend } from "react-icons/gr";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";
import axios from "axios";

const MessageInput = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { messages, setMessages, selectedConversation } = useConversation();
  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `/api/v1/messages/send/${selectedConversation?._id}`,
        JSON.stringify({ message }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = res.data;
      if (data.error) {
        throw new Error(data.error);
      }
      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    setLoading(true);
    await sendMessage(message);
    setMessage("");
  };
  return (
    <form className="px-4 my-3">
      <div className="w-full flex items-center gap-3 relative">
        <input
          type="text"
          placeholder="Type a message"
          className="w-full input input-bordered text-sm rounded block p-2.5 bg-gray-700 text-white"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
          onClick={handleSubmit}
        >
          {loading ? (
            <div className="loading-spinner loader"></div>
          ) : (
            <GrSend className="text-2xl" />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
