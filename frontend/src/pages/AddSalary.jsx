import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { departmentCall } from "../utils/EmployeeHelper";

const AddSalary = () => {
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    department: "",
    employee: "",
    basicSalary: "",
    allowances: "",
    deductions: "",
    payDate: "",
  });

  // Dropdown States
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await departmentCall();
        setDepartments(response);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchEmployeesByDept = async () => {
      if (formData.department) {
        try {
          const token = localStorage.getItem("token");

          const response = await axios.get(
            `http://localhost:3000/api/employee/department/${formData.department}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (response.data.employees) {
            setEmployees(response.data.employees);
          }
        } catch (error) {
          console.log("Error fetching employees:", error);
        }
      } else {
        setEmployees([]);
      }
    };
    fetchEmployeesByDept();
  }, [formData.department]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/salary/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const netSalary =
    (Number(formData.basicSalary) || 0) +
    (Number(formData.allowances) || 0) -
    (Number(formData.deductions) || 0);

  return (
    <div className="flex-1 flex items-center justify-center p-4 sm:p-8 overflow-y-auto bg-gray-50 h-full w-full">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-gray-100 pb-4 gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Add Salary</h2>
            <p className="text-gray-500 text-sm mt-1">
              Process new salary record for an employee.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department <span className="text-red-500">*</span>
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors bg-white"
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept._id} value={dept._id}>
                    {dept.departmentName}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Employee */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employee ID<span className="text-red-500">*</span>
              </label>
              <select
                name="employee"
                value={formData.employee}
                onChange={handleChange}
                required
                disabled={!formData.department}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors bg-white disabled:bg-gray-100"
              >
                <option value="">Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.employeeId}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Basic Salary */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Basic Salary (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="basicSalary"
                value={formData.basicSalary}
                onChange={handleChange}
                required
                min="0"
                placeholder="e.g. 20000"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>

            {/* 4. Allowances */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Allowances (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="allowances"
                value={formData.allowances}
                onChange={handleChange}
                required
                min="0"
                placeholder="e.g. 5000"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>

            {/* 5. Deductions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deductions (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="deductions"
                value={formData.deductions}
                onChange={handleChange}
                required
                min="0"
                placeholder="e.g. 1000"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>

            {/* 6. Pay Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pay Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="payDate"
                value={formData.payDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Net Salary Display Card */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex justify-between items-center mt-4">
            <span className="text-blue-800 font-medium">
              Net Payable Salary:
            </span>
            <span className="text-2xl font-bold text-blue-700">
              ₹{netSalary.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100 mt-6">
            <button
              type="button"
              onClick={() => navigate("/admin-dashboard/salary")}
              className="px-6 py-2.5 rounded-lg font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-colors"
            >
              Process Salary
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSalary;
