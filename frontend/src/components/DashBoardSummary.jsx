import { useEffect, useState } from "react";
import StatCard from "./StatCard";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
// Recharts import panrom
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const DashBoardSummary = () => {
  const { setIsSidebarOpen } = useOutletContext();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/dashboard", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setDashboard(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  // Graph-kukaana Data & Colors (Approved - Green, Pending - Yellow, Rejected - Red)
  const leaveChartData = [
    { name: "Approved", value: dashboard?.leaveSummary?.approved || 0, color: "#16a34a" },
    { name: "Pending", value: dashboard?.leaveSummary?.pending || 0, color: "#ca8a04" },
    { name: "Rejected", value: dashboard?.leaveSummary?.rejected || 0, color: "#dc2626" },
  ];

  return (
    <div className="flex-1 w-full bg-gray-50 relative">
      <div className="flex flex-col h-screen overflow-hidden">
        
        {/* Mobile Header */}
        <div className="md:hidden h-16 bg-white border-b border-gray-200 flex items-center px-4 shadow-sm flex-shrink-0 z-10">
          <button
            className="text-gray-600 hover:text-blue-600 focus:outline-none p-2 mr-3"
            onClick={() => setIsSidebarOpen(true)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <span className="text-lg font-bold text-gray-800">Dashboard</span>
        </div>

        {/* Scrollable Main Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Dashboard Overview
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Visualized insights of your company data.
              </p>
            </div>

            {loading ? (
               <div className="flex justify-center p-8 text-gray-500">Loading dashboard metrics...</div>
            ) : (
              <>
                {/* 1. Company Overview Section */}
                <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                  Company Metrics
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
                  <StatCard title="Total Employees" value={dashboard?.totalEmployee ?? 0} />
                  <StatCard title="Total Departments" value={dashboard?.totalDepartment ?? 0} valueColor="text-indigo-600" />
                  <StatCard title="Monthly Salary Expenses" value={`₹${(dashboard?.totalSalary ?? 0).toLocaleString()}`} valueColor="text-blue-600" />
                </div>

                {/* 2. Leave Summary Section with GRAPH */}
                <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2 mt-8">
                  Leave Analytics
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  
                  {/* Left Side: Stat Cards (Takes 2 cols on large screen) */}
                  <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 h-fit">
                    <StatCard title="Leaves Applied" value={dashboard?.leaveSummary?.appliedFor ?? 0} />
                    <StatCard title="Approved Leaves" value={dashboard?.leaveSummary?.approved ?? 0} valueColor="text-green-600" />
                    <StatCard title="Pending Leaves" value={dashboard?.leaveSummary?.pending ?? 0} valueColor="text-yellow-600" />
                    <StatCard title="Rejected Leaves" value={dashboard?.leaveSummary?.rejected ?? 0} valueColor="text-red-600" />
                  </div>

                  {/* Right Side: Recharts Donut Chart */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center">
                    <h4 className="text-md font-semibold text-gray-700 mb-4 self-start">Leave Distribution</h4>
                    <div className="w-full h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={leaveChartData}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {leaveChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                          />
                          <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                </div>
              </>
            )}



          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardSummary;