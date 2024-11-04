import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import toast from "react-hot-toast";
import useConversation from "../../zustand/useConversation";

const Messages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const lastMessageRef = useRef();

  useEffect(() => {
    const getMessage = async () => {
      if (!selectedConversation?._id) return; // Exit if no conversation is selected
      setLoading(true);
      try {
        const res = await axios.get(
          `/api/v1/messages/${selectedConversation._id}`
        );
        const data = res.data;
        if (data.error) throw new Error(data.error); // Check for error in response
        setMessages(data); // Assuming `data` is an array of messages
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getMessage(); // Call getMessage when selectedConversation changes
  }, [selectedConversation?._id]); // Only depend on selectedConversation._id

  // useEffect for scrolling to last message in the conversation
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, [messages]);

  return (
    <div className="overflow-auto flex-1 px-4">
      {!loading && messages.length === 0 ? (
        <p className="text-center text-gray-300">
          Send a message to start a conversation
        </p>
      ) : (
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} loading={loading} />
          </div>
        ))
      )}
    </div>
  );
};

export default Messages;
