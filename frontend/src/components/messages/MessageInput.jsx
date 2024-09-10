import React from "react";
import { GrSend } from "react-icons/gr";

const MessageInput = () => {
  return (
    <form className="px-4 my-3">
      <div className="w-full flex items-center gap-3 relative">
        <input
          type="text"
          placeholder="Type a message"
          className="w-full input input-bordered text-sm rounded block p-2.5 bg-gray-700 text-white"
        />
        <button className="absolute inset-y-0 end-0 flex items-center pe-3">
          <GrSend className="text-2xl" />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
