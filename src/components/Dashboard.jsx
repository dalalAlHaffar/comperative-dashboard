import {
  BanknotesIcon,
  ChevronDownIcon,
  FolderOpenIcon,
  ShoppingBagIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import NavBar from "./NavBar";
import SalesChart from "./SalesChart";
import Sidebar from "./SideBar";

const Dashboard = () => {
  return (
    <div className="flex min-w-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 bg-main-background min-h-screen">
        <NavBar />
        <MainDashboard />
      </div>
    </div>
  );
};

const MainDashboard = () => (
  <main className=" px-5 py-5">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      <div className="bg-white rounded-lg shadow-md flex items-center px-4 py-6">
        <div className="bg-[#5570F11F] rounded p-3">
          <UserGroupIcon className="text-[#5570F1] h-6 w-6" />
        </div>
        <div className="mx-4">
          <h4 className="text-2xl font-semibold text-gray-700 text-left">
            100
          </h4>
          <p className="text-gray-500"> Users</p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md flex items-center px-4 py-6 ">
        <div className="bg-[#FFCC9129] rounded p-3">
          <ShoppingBagIcon className="text-[#FFCC91] h-6 w-6" />
        </div>
        <div className="mx-4">
          <h4 className="text-2xl font-semibold text-gray-700 text-left">
            500
          </h4>
          <p className="text-gray-500"> All Orders</p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md flex items-center px-4 py-6 ">
        <div className="bg-[#4CAF5029] rounded p-3">
          <FolderOpenIcon className="text-[#4CAF50] h-6 w-6" />
        </div>
        <div className="mx-4">
          <h4 className="text-2xl font-semibold text-gray-700 text-left">50</h4>
          <p className="text-gray-500"> Active Products</p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md flex items-center px-4 py-6">
        <div className="bg-[#80008029] rounded p-3">
          <BanknotesIcon className="text-[#800080] h-6 w-6" />
        </div>
        <div className="mx-4">
          <h4 className="text-2xl font-semibold text-gray-700 text-left">
            1000
          </h4>
          <p className="text-gray-500">Total Sales</p>
        </div>
      </div>
    </div>
    <div className="mt-6 bg-white p-6 rounded-lg shadow text-center max-w-3/4 mx-auto">
      <p className="text-gray-500">Sales Trends</p>
      <SalesChart />
    </div>
  </main>
);

export default Dashboard;
