import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useAuth } from "../../context/auth";

const LeaveAdd = () => {
  const { setIsSidebarOpen } = useOutletContext();
  const { id } = useParams();
  const {user} = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId:user._id,
    leaveType: "",
    fromDate: "",
    toDate: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const fetchLeave = async () => {
      if (id) {
        const token = localStorage.getItem("token");
        try {
          const response = await axios.get(
            `http://localhost:3000/api/leave/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          
          if (response.data.success) {
            const leave = response.data.leave;
            setFormData({
              leaveType: leave.leaveType || "",
              fromDate: leave.fromDate ? new Date(leave.fromDate).toISOString().split("T")[0] : "",
              toDate: leave.toDate ? new Date(leave.toDate).toISOString().split("T")[0] : "",
              description: leave.description || "",
            });
          }
        } catch (error) {
          console.log(error.response);
        }
      }
    };

    fetchLeave();
  }, [id]);


  const handleSubmit = async (e) => {
    const token =localStorage.getItem('token')
    e.preventDefault();
    try {
        // Add Leave API
        const response = await axios.post(
          "http://localhost:3000/api/leave/add",
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      

      if (response.data.success) {
        navigate(`/employee-dashboard/leave`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden w-full">
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
        <span className="text-lg font-bold text-gray-800">
          {id ? "Edit Leave" : "Apply Leave"}
        </span>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 overflow-y-auto bg-gray-50">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
          
          {/* Header Section */}
          <div className="mb-6 border-b border-gray-100 pb-4">
            <h2 className="text-xl font-bold text-gray-800">
              {id ? "Edit Leave Request" : "Apply for Leave"}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {`Fill in the details below to ${id ? "update your" : "submit a new"} leave request.`}
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* 1. Leave Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Leave Type <span className="text-red-500">*</span>
              </label>
              <select
                name="leaveType"
                value={formData.leaveType}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors bg-white"
              >
                <option value="">Select leave type</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Annual Leave">Annual Leave</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 2. From Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="fromDate"
                  value={formData.fromDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
              </div>

              {/* 3. To Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="toDate"
                  value={formData.toDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* 4. Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Reason for leave..."
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none"
              ></textarea>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-2.5 rounded-lg font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-colors"
              >
                {id ? "Update Leave" : "Apply Leave"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default LeaveAdd;