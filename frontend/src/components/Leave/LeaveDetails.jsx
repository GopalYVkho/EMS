import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const LeaveDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [leave, setLeave] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(leave);
  useEffect(() => {
    const fetchEmployee = async () => {
      if (id) {
        const token = localStorage.getItem("token");
        try {
          const response = await axios.get(
            `http://localhost:3000/api/leave/detail/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data.success) {
            setLeave(response.data.leave);
          }
        } catch (error) {
          console.log(error.response);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!leave) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-screen bg-gray-50">
        <p className="text-gray-500 mb-4">Leave details not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3000/api/leave/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        navigate('/admin-dashboard/Leave')
      }
    } catch (error) {
      console.log("Error updating status:", error);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-gray-50 h-full">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800"> </h1>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm font-medium text-sm"
          >
            ← Back to List
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 bg-gray-50 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100">
              <img
                src={`http://localhost:3000/${leave?.employeeId?.userId?.profileImage}`}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md mb-4"
              />
              <h2 className="text-xl font-bold text-gray-800 text-center">
                {leave?.employeeId?.userId?.name}
              </h2>
              <p className="text-blue-600 font-medium text-center mt-1">
                {leave.employeeId.designation}
              </p>
              <div className="mt-4 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full uppercase tracking-wide">
                {leave.employeeId.employeeId}
              </div>
            </div>

            <div className="md:w-2/3 p-8">
              <h3 className="text-lg font-bold text-gray-800 mb-6 border-b border-gray-100 pb-2">
                Personal & Work Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                {/* Email */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email Address</p>
                  <p className="font-medium text-gray-900">
                    {leave?.employeeId?.userId?.email}
                  </p>
                </div>

                {/* Department */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">Department</p>
                  <p className="font-medium text-gray-900">
                    {leave?.employeeId?.department?.departmentName}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Leave Type</p>
                  <p className="font-medium text-gray-900">{leave.leaveType}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    Leave Description
                  </p>
                  <p className="font-medium text-gray-900">
                    {leave.description}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">From Date</p>
                  <p className="font-medium text-gray-900">
                    {new Date(leave.fromDate).toLocaleDateString()}{" "}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">To Date</p>
                  <p className="font-medium text-gray-900">
                    {new Date(leave.toDate).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  <p className="font-medium text-gray-900">{leave.status}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-2">Action</p>

                  {leave.status === "Pending" ? (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          handleStatusChange(leave._id, "Approved")
                        }
                        className=" cursor-pointer
px-4 py-1.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChange(leave._id, "Rejected")
                        }
                        className="cursor-pointer
 px-4 py-1.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        leave.status === "Approved"
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : "bg-red-100 text-red-800 border border-red-200"
                      }`}
                    >
                      {leave.status}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveDetails;
