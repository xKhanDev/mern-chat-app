import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup.js";

const SignUp = () => {
  let [inputs, setInputs] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  });

  const { loading, signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await signup(inputs);
  };

  return (
    <div className="flex flex-col justify-center items-center min-w-96 mx-auto">
      <div className="w-full p-[18px] rounded-lg shadow-md bg-white backdrop-filter bg-clip-padding backdrop-blur-lg bg-opacity-20">
        <h1 className="text-3xl font-semibold text-center">
          SignUp
          <span className="text-blue-500 ml-2">Chatiii</span>
        </h1>
        <form className="w-full *:capitalize " onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base font-semibold label-text">
                fullname
              </span>
            </label>
            <input
              type="text"
              placeholder="Safeer Khan"
              className="w-full input input-bordered h-10"
              value={inputs.fullname}
              onChange={(e) =>
                setInputs({ ...inputs, fullname: e.target.value })
              }
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base font-semibold label-text">
                username
              </span>
            </label>
            <input
              type="text"
              placeholder="safeerkhan"
              className="w-full input input-bordered h-10"
              value={inputs.username}
              onChange={(e) => {
                setInputs({ ...inputs, username: e.target.value });
              }}
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
              placeholder="password"
              className="w-full input input-bordered h-10"
              value={inputs.password}
              onChange={(e) => {
                setInputs({ ...inputs, password: e.target.value });
              }}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base font-semibold label-text">
                confirm password
              </span>
            </label>
            <input
              type="password"
              placeholder="confirm password"
              className="w-full input input-bordered h-10"
              value={inputs.confirmPassword}
              onChange={(e) => {
                setInputs({ ...inputs, confirmPassword: e.target.value });
              }}
            />
          </div>
          <div>
            <label className="label p-2">
              <span
                className="text-base font-semibold label-text"
                name="gender"
              >
                Gender
              </span>
            </label>
            <div className="flex gap-10">
              <div className="flex items-center">
                <label className="label p-2" htmlFor="male">
                  male
                </label>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  className="radio"
                  value={"male"}
                  defaultChecked
                  onChange={(e) => {
                    setInputs({ ...inputs, gender: e.target.value });
                  }}
                />
              </div>
              <div className="flex items-center">
                <label className="label p-2" htmlFor="female">
                  female
                </label>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  className="radio"
                  value={"female"}
                  onChange={(e) => {
                    setInputs({ ...inputs, gender: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>
          <Link
            to={"/login"}
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            already have an account?
          </Link>
          <div className="w-full flex justify-center">
            <button
              className="btn btn-sm mt-4 hover:shadow-lg hover:shadow-blue-500 hover:border-white hover:border-[0.1px]"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
