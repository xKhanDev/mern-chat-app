import React from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

const MessageContainer = () => {
  return (
    <div className="flex flex-col md:min-w-[450px]">
      {/* Header */}
      <>
        <div className="bg-slate-500 px-4 py-2 mb-2 flex gap-2 items-center">
          <span className="label-text text-white">To:</span>
          <span className="font-bold text-gray-900">Safeer Khan</span>
        </div>
      </>
      <Messages />
      <MessageInput />
    </div>
  );
};

export default MessageContainer;
