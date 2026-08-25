import EmployeeTable from "./EmployeeTable";
import StatCard from "./StatCard";
import { useOutletContext } from "react-router-dom";

const DashBoardSummary = () => {
  const { setIsSidebarOpen } = useOutletContext();

  const employeeData = [
    {
      id: 1,
      name: "Karthik",
      role: "Frontend Developer",
      status: "Active",
      email: "karthik@example.com",
    },
    {
      id: 2,
      name: "Priya",
      role: "Backend Developer",
      status: "Active",
      email: "priya@example.com",
    },
    {
      id: 3,
      name: "Arun",
      role: "UI/UX Designer",
      status: "On Leave",
      email: "arun@example.com",
    },
  ];
  return (
    <div className="flex-1 w-full">
      {/* MAIN CONTENT AREA */}
      <div className="flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden h-16 bg-white border-b border-gray-200 flex items-center px-4 shadow-sm flex-shrink-0 z-10">
          <button
            className="text-gray-600 hover:text-blue-600 focus:outline-none p-2 mr-3"
            onClick={() => setIsSidebarOpen(true)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
          <span className="text-lg font-bold text-gray-800">Dashboard</span>
        </div>

        {/* Scrollable Main Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
              <div className="hidden md:block">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Dashboard
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                  Employee Management System Overview
                </p>
              </div>
              <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors duration-200 shadow-md">
                + Add Employee
              </button>
            </div>

            {/* StatCards rendered using the reusable component */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
              <StatCard title="Total Employees" value="124" />
              <StatCard
                title="Active Today"
                value="118"
                valueColor="text-blue-600"
              />
              <StatCard title="On Leave" value="6" />
            </div>

            {/* EmployeeTable Component injected here */}
            <EmployeeTable data={employeeData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardSummary;
