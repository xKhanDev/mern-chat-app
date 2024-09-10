import React from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogOut from "./LogOut";

const Sidebar = () => {
  return (
    <div className="border-r border-slate-300 p-4 flex flex-col">
      <SearchInput />
      <div className="divider px-3"></div>
      <div className="flex flex-col overflow-y-auto mb-2">
        <Conversations />
        <Conversations />
        <Conversations />
        <Conversations />
        <Conversations />
        <Conversations />
        <Conversations />
      </div>
      <LogOut />
    </div>
  );
};

export default Sidebar;
