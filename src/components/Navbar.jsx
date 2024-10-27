import React from "react";
import { FiFileText } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Avatar } from "@mui/material";

const Navbar = () => {
  const navigate = useNavigate();
  const currUser = useSelector((state) => state?.reducer?.user);

  console.log("curruser",currUser);

  if(!currUser) return null;

  return (
    <div className=" w-full h-full bg-slate-50 border border-b-gray-300 shadow-sm">
      <div className=" max-w-7xl w-full mx-auto p-2 max-sm:py-1.5">
        <div className=" flex items-center w-full justify-around max-sm:justify-between">
          <div className="flex items-center justify-center gap-4 cursor-pointer" onClick={()=> navigate("/")}>
            <FiFileText
              className="text-blue-500 hover:text-blue-600 transition-all duration-300 ease-in-out"
              size={55}
              style={{
                padding: "12px",
                backgroundColor: "#eef2f7",
                borderRadius: "50%",
                border: "3px solid #d1d5db",
                boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
              }}
            />
            <h1 className="text-4xl max-sm:text-3xl font-bold text-blue-800">
              Fomify
            </h1>
          </div>
          <div className=" max-sm:hidden">
            <SearchBar />
          </div>
          <div className=" cursor-pointer" onClick={()=> navigate("/profile")}>
            <Avatar src={currUser.profilePic} alt="image"  />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
