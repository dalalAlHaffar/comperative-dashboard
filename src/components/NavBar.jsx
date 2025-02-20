import React from "react";
import { ChevronDownIcon, HomeIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="md:flex justify-between items-center bg-white px-4 py-2 border-none block mx-auto md:mx-0">
        <span className="text-md text-black-60 font-semibold">Dashboard</span>
        <div className="p-2 bg-secondary-20 text-black-100 rounded-md flex items-center space-x-2 w-fit">
          <span>Nanny’s Shop</span>
          <ChevronDownIcon className="w-4 h-4 font-normal" />
        </div>
      </div>
      <div className="flex items-center bg-white px-4 py-1 border-none mt-0.5">
        <a onClick={() => navigate("/dashboard")}>
          <HomeIcon className="w-4 h-4 text-primary-100" />
        </a>
      </div>
    </div>
  );
}

export default NavBar;
