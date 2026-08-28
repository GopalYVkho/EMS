import { useState } from "react";
import { Outlet } from "react-router-dom";
import EmployeSidebar from "../components/EmployeSidebar";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      <EmployeSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Outlet context={{setIsSidebarOpen}} />
    </div>
  );
};

export default Dashboard;