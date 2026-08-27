import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EmpView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      if (id) {
        const token = localStorage.getItem("token");
        try {
          const response = await axios.get(
            `http://localhost:3000/api/employee/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          
          if (response.data.success) {
            setEmployee(response.data.employee); 
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

  if (!employee) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-screen bg-gray-50">
        <p className="text-gray-500 mb-4">Employee details not found.</p>
        <button onClick={() => navigate(-1)} className="text-blue-600 hover:underline">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-gray-50 h-full">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Employee Profile</h1>
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
                src={`http://localhost:3000/${employee.userId?.profileImage}`}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md mb-4"
              />
              <h2 className="text-xl font-bold text-gray-800 text-center">
                {employee.userId?.name}
              </h2>
              <p className="text-blue-600 font-medium text-center mt-1">
                {employee.designation}
              </p>
              <div className="mt-4 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full uppercase tracking-wide">
                {employee.employeeId}
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
                  <p className="font-medium text-gray-900">{employee.userId?.email}</p>
                </div>

                {/* Department */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">Department</p>
                  <p className="font-medium text-gray-900">{employee.department?.departmentName}</p>
                </div>

                {/* Date of Birth */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">Date of Birth</p>
                  <p className="font-medium text-gray-900">
                    {new Date(employee.dob).toLocaleDateString()}
                  </p>
                </div>

                {/* Gender */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">Gender</p>
                  <p className="font-medium text-gray-900">{employee.gender}</p>
                </div>

                {/* Marital Status */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">Marital Status</p>
                  <p className="font-medium text-gray-900">{employee.maritalStatus}</p>
                </div>

                {/* Salary */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">Salary</p>
                  <p className="font-medium text-gray-900">₹{employee.salary.toLocaleString()}</p>
                </div>
                
                {/* Role */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">System Role</p>
                  <p className="font-medium text-gray-900 capitalize">{employee.userId?.role}</p>
                </div>
              </div>
              
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default EmpView;