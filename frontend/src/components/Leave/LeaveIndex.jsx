import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { customStyles } from "../../utils/CommonHelper";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useAuth } from "../../context/auth";

const LeaveIndex = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const { id } = useParams();
  const {user} = useAuth();
  useEffect(() => {
    const fetchEmployee = async () => {
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
            setData(response.data.leaveList); 
          }
        } catch (error) {
          console.log(error.response);
        } 
      }
    };

    fetchEmployee();
  }, [id]);

  const columns = useMemo(
    () => [
      {
        name: "NAME", 
        selector: (row) => row.leaveType,
        sortable: true,
      },
      
      {
        name: "FROM",
        selector: (row) => new Date(row.fromDate).toLocaleDateString(),
        sortable: true,
      },
      {
        name: "TO",
        selector: (row) => new Date(row.toDate).toLocaleDateString(),
        sortable: true,
      },
      {
        name: "Description",
        selector: (row) => row.description,
        sortable: true,
      },
      {
        name: "Status",
        selector: (row) => row.status,
        sortable: true,
      },
    ],
    []
  );

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter((item) =>
      item.leaveType.toLowerCase().includes(searchText.toLowerCase())
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
                  Leave
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                  Manage your leave here.
                </p>
              </div>
              {user.role === "employee" && (
                <Link
                  to="/employee-dashboard/leave/add"
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors duration-200 shadow-md text-center"
                >
                  + Add Leave
                </Link>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 pt-4">
              <div className="px-4 sm:px-6 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-lg font-bold text-gray-800">
                  Leave List
                </h2>
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

export default LeaveIndex;
