import { Link } from "react-router-dom";


const Departments = () => {
  return (
    <div className="flex-1 w-full">
      {/* MAIN CONTENT AREA */}
      <div className="flex flex-col h-screen overflow-hidden">
        {/* Scrollable Main Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
              <div className="hidden md:block">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Department
                </h1>
              </div>
              <Link to="/admin-dashboard/departments-form" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors duration-200 shadow-md">
                + Add Department
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Departments;
