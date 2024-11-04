import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdSearch } from "react-icons/io";
import useConversation from "../../zustand/useConversation";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const { setSelectedConversation } = useConversation();
  // console.log(users);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 0) return toast.error("Search can't be Empty");
    const conversation = users.find((user) => {
      return user?.fullName.toLowerCase().includes(search.toLocaleLowerCase());
    });
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else toast.error(`No user found with name ${search} `);
  };
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
        setUsers(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);
  return (
    <div className="flex items-center gap-3">
      <input
        type="search"
        placeholder="search"
        className="w-full input input-bordered h-12"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="btn btn-circle" onClick={handleSubmit}>
        <IoMdSearch className="text-2xl" />
      </button>
    </div>
  );
};

export default SearchInput;
