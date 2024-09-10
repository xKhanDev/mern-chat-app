import React from "react";

const Conversations = () => {
  return (
    <>
      <div className="flex gap-2 items-center rounded p-2 py-1 cursor-pointer hover:bg-sky-600">
        <div className="avatar online">
          <div className="w-14 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="text-lg font-semibold text-gray-200">Safeer khan</p>
            <span className="text-lg">😊</span>
          </div>
        </div>
      </div>
      <div className="divider py-0 my-0 h-1"></div>
    </>
  );
};

export default Conversations;
