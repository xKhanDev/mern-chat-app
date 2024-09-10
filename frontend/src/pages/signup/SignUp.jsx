import React from "react";

const SignUp = () => {
  return (
    <div className="flex flex-col justify-center items-center min-w-96 mx-auto">
      <div className="w-full p-[18px] rounded-lg shadow-md bg-white backdrop-filter bg-clip-padding backdrop-blur-lg bg-opacity-20">
        <h1 className="text-3xl font-semibold text-center">
          SignUp
          <span className="text-blue-500 ml-2">Chatiii</span>
        </h1>
        <form className="w-full *:capitalize ">
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
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base font-semibold label-text">
                password
              </span>
            </label>
            <input
              type="text"
              placeholder="password"
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base font-semibold label-text">
                confirm password
              </span>
            </label>
            <input
              type="text"
              placeholder="confirm password"
              className="w-full input input-bordered h-10"
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
                />
              </div>
            </div>
          </div>
          <a
            href="#"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            already have an account?
          </a>
          <div className="w-full flex justify-center">
            <button className="btn btn-sm mt-4 hover:shadow-lg hover:shadow-blue-500 hover:border-white hover:border-[0.1px]">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
