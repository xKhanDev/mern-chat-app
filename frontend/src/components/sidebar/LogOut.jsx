import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoMdLogOut } from "react-icons/io";
import { useAuthContext } from "../../context/AuthContext";

const LogOut = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const logoutFun = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/v1/auth/logout", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = res.data;
      if (data.error) {
        throw new Error(data.error);
      }
      toast.success("Logged out successfully");
      //removing from local storage
      localStorage.removeItem("chat-user");
      //setting auth user to null
      setAuthUser(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-auto cursor-pointer">
      {!loading ? (
        <button
          type="button"
          className="btn btn-ghost btn-circle"
          onClick={logoutFun}
        >
          <IoMdLogOut className="text-3xl text-white h-6 w-6" />
        </button>
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};

export default LogOut;
