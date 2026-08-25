
const EmployeeTable = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
      <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-800">Recent Employees</h2>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
              <th className="px-4 sm:px-6 py-3 sm:py-4 font-medium">Name</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 font-medium">Role</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 font-medium">Email</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {data.map((emp) => (
              <tr key={emp.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-4 sm:px-6 py-3 sm:py-4 font-medium text-gray-900">{emp.name}</td>
                <td className="px-4 sm:px-6 py-3 sm:py-4">{emp.role}</td>
                <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-500">{emp.email}</td>
                <td className="px-4 sm:px-6 py-3 sm:py-4">
                  <span
                    className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                      emp.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;