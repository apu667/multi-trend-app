import React, { useState } from "react";
import { Button } from "../ui/button";
import SignUp from "./DialogBox/SignUp";
import SignIn from "./DialogBox/SignIn";

const Navbar = () => {
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);


  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg shadow-md shadow-gray-900/20 border-b border-gray-200/30">
      <div className="max-w-7xl mx-auto px-6 md:px-0 flex items-center justify-between py-3 text-gray-200">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <p className="text-white text-lg md:text-xl font-semibold">Magic UI</p>
        </div>

        {/* Menu / CTA Section */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Login Button */}
          <Button
           onClick={() => setOpenSignIn(true)}
            className="bg-transparent border border-gray-300 text-gray-200 hover:bg-gray-200 hover:text-gray-900 transition-colors duration-300">
            Login
          </Button>

          {/* Sign Up Button */}
          <Button
            onClick={() => setOpenSignUp(true)}
            className="bg-gray-100 text-gray-900 hover:bg-violet-600 hover:text-white transition-colors duration-300">
            Sign Up
          </Button>
        </div>
      </div>
      <SignUp open={openSignUp} onChange={setOpenSignUp} />
      <SignIn openSignIn={openSignIn} setOpenSignIn={setOpenSignIn} />
    </nav>
  );
};

export default Navbar;
