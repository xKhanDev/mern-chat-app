import React from "react";

const Login = () => {
  return (
    <div className="flex flex-col justify-center items-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-white backdrop-filter bg-clip-padding backdrop-blur-lg bg-opacity-20">
        <h1 className="text-3xl font-semibold text-center">
          Login
          <span className="text-blue-500 ml-2">Chatiii</span>
        </h1>
        <form className="w-full *:capitalize">
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
            />
          </div>
          <a
            href="#"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            {"Don't"} have an account?
          </a>
          <div className="w-full flex items-center justify-center">
            <button className="btn btn-sm mt-4 hover:shadow-lg hover:shadow-blue-500 hover:border-white hover:border-[0.1px]">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
