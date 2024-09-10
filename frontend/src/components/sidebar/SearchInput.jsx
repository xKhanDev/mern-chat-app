import React from "react";
import { IoMdSearch } from "react-icons/io";

const SearchInput = () => {
  return (
    <div className="flex items-center gap-3">
      <input
        type="search"
        placeholder="search"
        className="w-full input input-bordered h-12"
      />
      <button className="btn btn-circle">
        <IoMdSearch className="text-2xl" />
      </button>
    </div>
  );
};

export default SearchInput;
