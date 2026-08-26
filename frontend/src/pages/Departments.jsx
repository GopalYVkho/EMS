import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";

const Departments = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const indexCall = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:3000/api/department",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(response.data.departments);
      } catch (error) {
        console.log(error.response);
      }
    };
    indexCall();
  }, []);

  const columns = useMemo(
    () => [
      {
        name: "DEPARTMENT NAME",
        selector: (row) => row.departmentName,
        sortable: true,
        width: "30%",
      },
      {
        name: "DESCRIPTION",
        selector: (row) => row.description,
        sortable: true,
      },
      {
        name: "ACTIONS",
        cell: (row) => (
          <div className="flex gap-4">
            <button
              onClick={() =>
                navigate(`/admin-dashboard/departments-form/${row._id}`)
              }
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Edit
            </button>
            <button
              onClick={() => {
                setDepartmentToDelete(row._id);
                setIsModalOpen(true);
              }}
              className="text-red-500 hover:text-red-700 font-medium"
            >
              Delete
            </button>
          </div>
        ),
        button: true,
      },
    ],
    [navigate]
  );

  const customStyles = useMemo(
    () => ({
      table: {
        style: {
          backgroundColor: "#ffffff",
        },
      },
      headRow: {
        style: {
          backgroundColor: "#f9fafb",
          borderBottom: "1px solid #f3f4f6",
        },
      },
      headCells: {
        style: {
          fontSize: "0.75rem",
          fontWeight: "600",
          color: "#6b7280",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          paddingLeft: "24px",
          paddingRight: "24px",
        },
      },
      rows: {
        style: {
          fontSize: "0.875rem",
          color: "#374151",
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #f9fafb",
          "&:hover": {
            backgroundColor: "#f9fafb",
            transition: "all 0.2s ease",
          },
        },
      },
      cells: {
        style: {
          paddingTop: "16px",
          paddingBottom: "16px",
          paddingLeft: "24px",
          paddingRight: "24px",
        },
      },
    }),
    []
  );

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:3000/api/department/${departmentToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(data.filter((row) => row._id !== departmentToDelete));
      setIsModalOpen(false);
      setDepartmentToDelete(null);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter((item) =>
      item.departmentName.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [data, searchText]);

  return (
    <div className="flex-1 w-full bg-gray-50 relative">
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center transition-opacity"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
        >
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 max-w-sm w-full mx-4 transform transition-all">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Delete Department
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Are you sure you want to delete this department? This action
              cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setDepartmentToDelete(null);
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg font-medium transition-colors"
              >
                No, Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg font-medium shadow-md transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex flex-col h-screen overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
              <div className="hidden md:block">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Departments
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                  Manage your company departments here.
                </p>
              </div>
              <Link
                to="/admin-dashboard/departments-form"  
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors duration-200 shadow-md text-center"
              >
                + Add Department
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 pt-4">
              <div className="px-4 sm:px-6 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-lg font-bold text-gray-800">
                  Departments List
                </h2>
                <input
                  type="text"
                  placeholder="Search department..."
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

export default Departments;