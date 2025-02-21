import { useState, useEffect } from "react";
import {
  HomeIcon,
  ShoppingCartIcon,
  UsersIcon,
  FolderOpenIcon,
  ArrowRightStartOnRectangleIcon,
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../helpers/handelLogout";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.outerWidth < 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div
      className={`relative min-h-screen bg-white shadow-md p-4 transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo & Toggle Button */}
      <div className="flex items-center justify-between text-xl text-black-60">
        {!isCollapsed && (
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="w-10 h-10" />
            <h2 className="text-xl font-bold ml-3">Metrix</h2>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          {isCollapsed ? (
            <ArrowRightCircleIcon className="w-6 h-6 text-primary-60" />
          ) : (
            <ArrowLeftCircleIcon className="w-6 h-6 text-primary-60" />
          )}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="mt-6 space-y-3">
        <SidebarItem
          icon={<HomeIcon />}
          label="Dashboard"
          isCollapsed={isCollapsed}
          link="/dashboard"
        />
        <SidebarItem
          icon={<UsersIcon />}
          label="Users"
          isCollapsed={isCollapsed}
          link="/users"
        />
        <SidebarItem
          icon={<FolderOpenIcon />}
          label="Products"
          isCollapsed={isCollapsed}
          link="/products"
        />
        <SidebarItem
          icon={<ShoppingBagIcon />}
          label="Orders"
          isCollapsed={isCollapsed}
          link="/orders"
        />
      </nav>

      {/* Logout Button - Fixed at the Bottom */}
      <div className="absolute bottom-6 left-4 right-4">
        <SidebarItem
          icon={<ArrowRightStartOnRectangleIcon />}
          label="Logout"
          isCollapsed={isCollapsed}
          link="/logout"
        />
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, isCollapsed, link }) => {
  const navigate = useNavigate();
  const onClickFunction = () => {
    if (link == "/logout") {
      return handleLogout();
    }
    return navigate(link);
  };
  return (
    <div
      onClick={() => onClickFunction()}
      className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-200 text-black-50 ${
        location.href.includes(link) &&
        "bg-primary-100 text-white hover:bg-primary-100"
      }`}
    >
      <div className="w-6 h-6">{icon}</div>
      {!isCollapsed && <span className="ml-3">{label}</span>}
    </div>
  );
};

export default Sidebar;
