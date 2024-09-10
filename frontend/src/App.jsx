import React from "react";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Home from "./pages/home/Home";

const App = () => {
  return (
    <div className="p-4 flex justify-center items-center h-screen">
      {/* <Login /> */}
      {/* <SignUp /> */}
      <Home />
    </div>
  );
};

export default App;
