import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";


const DashboardLayout: React.FC = () => {
  return (
    <div className="h-screen flex flex-col md:flex-row">
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-[#000] p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
