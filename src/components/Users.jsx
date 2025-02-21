import {
  ArrowPathRoundedSquareIcon,
  PencilIcon,
  PencilSquareIcon,
  TrashIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetUsers } from "../hooks/useGetUsers";
import NavBar from "./NavBar";
import Sidebar from "./SideBar";

const Users = () => {
  return (
    <div className="flex min-w-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 bg-main-background min-h-screen">
        <NavBar link="/users" />
        <UserTable />
      </div>
    </div>
  );
};

const UserTable = () => {
  const [users, setUsers] = useState([]);
  useGetUsers(setUsers);
  const setIsActive = (id) => {
    setUsers((prevUsers) => {
      const updated = prevUsers.map((user) =>
        user.id === id ? { ...user, isActive: !user.isActive } : user
      );
      localStorage.setItem("users", JSON.stringify(updated));
      return updated;
    });
  };
  return (
    <main className=" px-5 py-5">
      <div className="mt-8 flex min-w-full border-b border-gray-200 shadow rounded-lg overflow-auto">
        <table className="min-w-full">
          <thead className="bg-white">
            <tr className="text-left">
              <th className="table-header">Name</th>
              <th className="table-header">Email</th>
              <th className="table-header">Status</th>
              <th className="table-header">Phone</th>
              <th className="table-header">Block/UnBlock</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {users?.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="text-left">
                  <td className="px-6 py-4 flex items-center">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={user.image}
                      alt="admin dashboard UI"
                    />
                    <p className="text-sm text-gray-800 font-medium ml-4">
                      {user.firstName} {user.lastName}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`${
                        user.isActive
                          ? "bg-green-100 text-green-800"
                          : "text-red-800 bg-red-100"
                      } py-1 px-2 text-sm font-semibold rounded-full`}
                    >
                      {user.isActive ? "Active" : "InActive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 break-words">
                    {user.phone}
                  </td>
                  <td className="px-6 py-4">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={user.isActive}
                        onChange={() => setIsActive(user.id)}
                        className="sr-only peer"
                      />
                      <div className="relative w-11 h-6 bg-primary-20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-10 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-100"></div>
                    </label>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className=" text-center p-5  text-gray-500">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};
export default Users;
