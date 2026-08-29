import { NavLink } from "react-router-dom";
import { useAuth } from "../context/auth";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
const {logout } = useAuth();
  return (
    <>
      {/* Mobile Sidebar Overlay Background */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar Container */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 flex flex-col shadow-lg transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
          <span className="text-xl font-bold text-blue-600 tracking-wider">
            EMS PRO
          </span>
          <button
            className="md:hidden text-gray-500 hover:text-gray-800 focus:outline-none"
            onClick={() => setIsSidebarOpen(false)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <NavLink
            to="/admin-dashboard"
            end
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-blue-600" 
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin-dashboard/employees"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-blue-600" 
              }`
            }
          >
            Employees
          </NavLink>
          <NavLink
            to="/admin-dashboard/departments"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-blue-600" 
              }`
            }
          >
            Departments
          </NavLink>
          <NavLink
            to="/admin-dashboard/Leave"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-blue-600" 
              }`
            }
          >
            Leave
          </NavLink>
          <NavLink
            to="/admin-dashboard/salary"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-blue-600" 
              }`
            }
          >
            Salary
          </NavLink>
          <NavLink
            to="/admin-dashboard/settings"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
              }`
            }
          >
            Settings
          </NavLink>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button className="w-full flex items-center justify-center px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg font-medium transition-colors"
          onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;