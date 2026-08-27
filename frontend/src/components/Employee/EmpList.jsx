import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { employeeCall } from "../../utils/EmployeeHelper";
import { customStyles } from "../../utils/CommonHelper";
import DataTable from "react-data-table-component";

const EmpList = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await employeeCall();
        setData(response);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchEmployee();
  }, []);

  const columns = useMemo(
    () => [
      {
        name: "NAME",
        selector: (row) => row.userId.name,
        sortable: true,
      },
      {
        name: "Image",
        selector: (row) => {
          return <img width="40" height="40" className="rounded-full" src={`http://localhost:3000/${row.userId.profileImage}`} />;
        },

        sortable: true,
      },
      {
        name: "Department",
        selector: (row) => row.department.departmentName,
        sortable: true,
      },
      {
        name: "DOB",
        selector: (row) => new Date(row.dob).toLocaleDateString(),
        sortable: true,
      },
      {
        name: "ACTIONS",
        minWidth: "280px",
        cell: (row) => (
          <div className="flex gap-4">
            <button
              onClick={() =>
                navigate(`/admin-dashboard/employees-form/${row._id}`)
              }
              className="text-green-600 hover:text-green-800 font-medium"
            >
              View
            </button>
            <button
              onClick={() =>
                navigate(`/admin-dashboard/employees-form-edit/${row._id}`)
              }
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Edit
            </button>
            <button
              onClick={() =>
                navigate(`/admin-dashboard/departments-form/salary/${row._id}`)
              }
              className="text-yellow-600 hover:text-yellow-800 font-medium"
            >
              Salary
            </button>
            <button
              className="text-red-500 hover:text-red-700 font-medium"
            >
              Leave
            </button>
          </div>
        ),
        button: true,
      },
    ],
    [navigate]
  );
  console.log(data);

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter((item) =>
      item.userId.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [data, searchText]);

  return (
    <div className="flex-1 w-full bg-gray-50 relative">
      {/* MAIN CONTENT AREA */}
      <div className="flex flex-col h-screen overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
              <div className="hidden md:block">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Employee
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                  Manage your company Employee here.
                </p>
              </div>
              <Link
                to="/admin-dashboard/employees-form"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors duration-200 shadow-md text-center"
              >
                + Add Employee
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 pt-4">
              <div className="px-4 sm:px-6 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-lg font-bold text-gray-800">
                  Employee List
                </h2>
                <input
                  type="text"
                  placeholder="Search Employee..."
                  className="w-full sm:w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-sm"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>

              <DataTable
                columns={columns}
                data={filteredData}
                customStyles={customStyles}
                pagination
                highlightOnHover
                pointerOnHover
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpList;
