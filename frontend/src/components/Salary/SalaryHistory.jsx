import  { useEffect, useState, useMemo } from "react";
import {  useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import { customStyles } from "../../utils/CommonHelper";

const SalaryHistory = () => {
  const {id} = useParams();
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:3000/api/salary/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setSalaries(response.data.salary);
        }
      } catch (error) {
        console.log("Error fetching salaries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalaries();
  }, []);

  const columns = useMemo(
    () => [
      {
        name: "BASIC (₹)",
        selector: (row) => row.basicSalary,
        format: (row) => row.basicSalary?.toLocaleString(),
        sortable: true,
      },
      {
        name: "ALLOWANCE (₹)",
        selector: (row) => row.allowances,
        format: (row) => row.allowances?.toLocaleString(),
        sortable: true,
      },
      {
        name: "DEDUCTION (₹)",
        selector: (row) => row.deductions,
        format: (row) => row.deductions?.toLocaleString(),
        sortable: true,
      },
      {
        name: "NET SALARY (₹)",
        selector: (row) => {
          const net = (row.basicSalary || 0) + (row.allowances || 0) - (row.deductions || 0);
          return net;
        },
        format: (row) => {
          const net = (row.basicSalary || 0) + (row.allowances || 0) - (row.deductions || 0);
          return <span className="font-bold text-blue-600">₹{net.toLocaleString()}</span>;
        },
        sortable: true,
        width: "15%",
      },
      {
        name: "PAY DATE",
        selector: (row) => new Date(row.payDate).toLocaleDateString(),
        sortable: true,
        width: "15%",
      },
    ],
    []
  );


  return (
    <div className="flex-1 w-full bg-gray-50 relative">
      <div className="flex flex-col h-screen overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
              <div className="hidden md:block">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Salary History
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                  View and manage employee salary records.
                </p>
              </div>
            </div>

            {/* Data Table Section */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 pt-4">
              
              <div className="px-4 sm:px-6 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              </div>

              <DataTable
                columns={columns}
                data={salaries}
                customStyles={customStyles}
                pagination
                highlightOnHover
                pointerOnHover
                progressPending={loading}
                progressComponent={
                  <div className="p-8 text-gray-500 font-medium">Loading salary history...</div>
                }
                noDataComponent={
                  <div className="p-8 text-gray-500">No salary records found.</div>
                }
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryHistory;