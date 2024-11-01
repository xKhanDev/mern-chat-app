import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const [inputs, setInputs] = useState({
    userName: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = handleInputError(inputs);
    if (!success) {
      return toast.error("All feilds are required");
    }

    await axios
      .post("http://localhost:5000/api/v1/auth/login", inputs, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // const data = res.data;
        // console.log(data);
        toast.success("Login successful");
        window.location.href = "/";
      })
      .catch((error) => {
        // console.error("Error during login:", error);
        toast.error("Login failed. Please check your credentials.");
      });
  };
  const handleInputError = ({ userName, password }) => {
    if (!userName || !password) {
      toast.error("All feilds are required");
      return false;
    }
    return true;
  };
  return (
    <div className="flex flex-col justify-center items-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-white backdrop-filter bg-clip-padding backdrop-blur-lg bg-opacity-20">
        <h1 className="text-3xl font-semibold text-center">
          Login
          <span className="text-blue-500 ml-2">Chatiii</span>
        </h1>
        <form className="w-full *:capitalize" onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base font-semibold label-text">
                Username
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
              value={inputs.userName}
              onChange={(e) =>
                setInputs({ ...inputs, userName: e.target.value })
              }
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base font-semibold label-text">
                password
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full input input-bordered h-10"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>
          <Link
            to={"/signup"}
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            {"Don't"} have an account?
          </Link>
          <div className="w-full flex items-center justify-center">
            <button
              className="btn btn-sm mt-4 hover:shadow-lg hover:shadow-blue-500 hover:border-white hover:border-[0.1px]"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
