import React from "react";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";

const Message = ({ message, loading }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message?.senderId === authUser?._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleColor = fromMe ? "bg-blue-500" : "bg-gray-700";
  const messageTime = message?.createdAt;
  const shakeClass = message?.shouldShake ? "shake" : "";

  return (
    <div className={`chat  ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>

      <div
        className={`chat-bubble text-white ${bubbleColor} pb-1 ${shakeClass}`}
      >
        {!loading ? (
          message.message
        ) : (
          <span className="loading loading-spinner"></span>
        )}
      </div>
      <time className="chat-footer text-xs opacity-50">
        {new Date(messageTime).toLocaleString()}
      </time>
    </div>
  );
};

export default Message;
