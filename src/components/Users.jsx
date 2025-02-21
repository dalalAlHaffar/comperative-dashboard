import {
  ArrowPathRoundedSquareIcon,
  PencilIcon,
  PencilSquareIcon,
  TrashIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
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
            {users?.length > 0 &&
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
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {user.phone}
                  </td>
                  <td className="px-6 py-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={user.isActive}
                        onChange={() => setIsOn(!user.isActive)}
                        className="sr-only peer"
                      />
                      <div className="w-12 h-6 pt-0.5 bg-primary-20 rounded-full p-1 transition peer-checked:bg-primary-100">
                        <div className="w-5 h-5 bg-white rounded-full shadow-md transform transition peer-checked:translate-x-6"></div>
                      </div>
                    </label>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};
export default Users;
