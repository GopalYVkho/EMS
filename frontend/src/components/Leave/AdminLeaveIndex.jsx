import { useEffect, useMemo, useState } from "react";
import { customStyles } from "../../utils/CommonHelper";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

const AdminLeaveIndex = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  useEffect(() => {
    const fetchEmployee = async () => {
      if (user._id) {
        const token = localStorage.getItem("token");
        try {
          const response = await axios.get(`http://localhost:3000/api/leave`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.success) {
            setData(response.data.leave);
          }
        } catch (error) {
          console.log(error.response);
        }
      }
    };

    fetchEmployee();
  }, [user._id]);

  const columns = useMemo(
    () => [
      {
        name: "Emp ID",
        selector: (row) => row?.employeeId?.employeeId,
        sortable: true,
      },
      {
        name: "Name",
        selector: (row) => row?.employeeId?.userId?.name,
        sortable: true,
      },
      {
        name: "Leave Type",
        selector: (row) => row.leaveType,
        sortable: true,
      },
      {
        name: "Department",
        selector: (row) => row?.employeeId?.department?.departmentName,
        sortable: true,
      },
      {
        name: "Days",
        selector: (row) => {
          if (!row?.fromDate || !row?.toDate) return 0;

          const start = new Date(row.fromDate);
          const end = new Date(row.toDate);

          const diffTime = end.getTime() - start.getTime();

          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          return diffDays + 1;
        },
        sortable: true,
      },
      {
        name: "status",
        selector: (row) => row.status,
        sortable: true,
      },
      {
        name: "ACTIONS",
        minWidth: "280px",
        cell: (row) => (
          <div className="flex gap-4">
            <button
                onClick={() =>
                  navigate(`/admin-dashboard/leave/details/${row._id}`)
                }
              className="text-green-600 hover:text-green-800 font-medium"
            >
              View
            </button>
          </div>
        ),
        button: true,
      },
    ],
    [navigate]
  );

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter((item) => {
      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      const matchesSearch = item.employeeId?.userId?.name
        ?.toLowerCase()
        .includes(searchText.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [data, searchText, statusFilter]);

  return (
    <div className="flex-1 w-full bg-gray-50 relative">
      <div className="flex flex-col h-screen overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
              <div className="hidden md:block">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Leave
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                  Manage and review leave requests here.
                </p>
              </div>

              <div className="flex w-full sm:w-auto bg-gray-100 p-1 rounded-lg border border-gray-200 overflow-x-auto">
                <button
                  onClick={() => setStatusFilter("All")}
                  className={`flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                    statusFilter === "All"
                      ? "bg-white text-gray-800 shadow-sm"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  All Leaves
                </button>
                <button
                  onClick={() => setStatusFilter("Pending")}
                  className={`flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    statusFilter === "Pending"
                      ? "bg-white text-yellow-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setStatusFilter("Approved")}
                  className={`flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    statusFilter === "Approved"
                      ? "bg-white text-green-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Approved
                </button>
                <button
                  onClick={() => setStatusFilter("Rejected")}
                  className={`flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    statusFilter === "Rejected"
                      ? "bg-white text-red-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Rejected
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 pt-4">
              <div className="px-4 sm:px-6 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-lg font-bold text-gray-800">Leave List</h2>
                <input
                  type="text"
                  placeholder="Search Leave..."
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

export default AdminLeaveIndex;
