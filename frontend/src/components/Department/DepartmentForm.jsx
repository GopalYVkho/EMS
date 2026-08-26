import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom"; // Mobile menu-kaga

const DepartmentForm = () => {
  const { setIsSidebarOpen } = useOutletContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const [departmentName, setDepartmentName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchDepartment = async () => {
      if (id) {
        const token = localStorage.getItem("token");
        try {
          const response = await axios.get(
            `http://localhost:3000/api/department/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setDepartmentName(response.data.department.departmentName);
          setDescription(response.data.department.description);
        } catch (error) {
          console.log(error.response);
        }
      }
    };

    fetchDepartment();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = { departmentName, description };
      let response;
      if(id){
        response = await axios.put(
          `http://localhost:3000/api/department/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }else{
        response = await axios.post(
          "http://localhost:3000/api/department/add",
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }
      

      
      if (response.data.success) {
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden w-full">
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
        <span className="text-lg font-bold text-gray-800">Add Department</span>
      </div>

    
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 overflow-y-auto bg-gray-50">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
          {/* Header Section */}
          <div className="mb-6 border-b border-gray-100 pb-4">
            <h2 className="text-xl font-bold text-gray-800">
              {id?"Edit Department" :"Add New Department"}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {`Fill in the details to ${id?"update":"create"} a department.`}
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Department Name Input */}
            <div>
              <label
                htmlFor="departmentName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Department Name
              </label>
              <input
                id="departmentName"
                type="text"
                name="departmentName"
                placeholder="e.g. Human Resources"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                required
              />
            </div>

            {/* Description Textarea */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                placeholder="Enter department description..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 pt-4">
              <button
                type="button"
                className="px-6 py-2.5 rounded-lg font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors"
                onClick={() => {
                  setDepartmentName("");
                  setDescription("");
                }}
              >
                Clear
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-colors"
              >
                {id?"Update Department":"Save Department"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DepartmentForm;
