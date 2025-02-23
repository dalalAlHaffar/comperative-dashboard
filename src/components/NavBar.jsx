import React from "react";
import {
  ArrowLeftStartOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../helpers/handelLogout";

function NavBar(props) {
  const navigate = useNavigate();

  return (
    <div>
      <div className="md:flex justify-between items-center bg-white px-4 py-2 border-none block mx-auto md:mx-0">
        <span className="text-md text-black-60 font-semibold">Dashboard</span>
        <div className="p-2 bg-secondary-20 text-black-100 rounded-md flex items-center space-x-2 w-fit m-auto md:m-0">
          <span>Hello! {localStorage.getItem("userName") ?? "USER"}</span>
          <ArrowRightStartOnRectangleIcon
            className="w-4 h-4 font-normal cursor-pointer"
            onClick={() => handleLogout()}
          />
        </div>
      </div>
      <div className="flex items-center bg-white px-4 py-1 border-none mt-0.5">
        <a onClick={() => navigate("/dashboard")}>
          <HomeIcon className="w-4 h-4 text-primary-100" />
        </a>
        <span className="text-black-30 font-light px-2">{props.link}</span>
      </div>
    </div>
  );
}

export default NavBar;
