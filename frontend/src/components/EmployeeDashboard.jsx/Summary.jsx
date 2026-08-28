import { useAuth } from "../../context/auth";

const Summary = () => {
  const { user } = useAuth();
  
  // Indraya thethi-ya theliva kaata (e.g., "Thursday, August 27, 2026")
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex-1 w-full bg-gray-50 p-4 sm:p-6 md:p-8 h-screen overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* --- WELCOME CARD --- */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
          
          {/* Decorative background blur effect */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-50 rounded-full opacity-70 blur-3xl pointer-events-none"></div>
          
          {/* Left Side: Greeting */}
          <div className="relative z-10">
            <p className="text-sm font-semibold text-blue-600 tracking-wide uppercase mb-1">
              {today}
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Welcome back, <span className="capitalize">{user?.name || "Employee"}</span>! 👋
            </h1>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              Ready to start your day? Here is your dashboard overview.
            </p>
          </div>

          {/* Right Side: Profile Image Avatar */}
          <div className="relative z-10 shrink-0">
            {user?.profileImage ? (
              <img
                src={`http://localhost:3000/${user.profileImage}`}
                alt="Profile"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-white shadow-md"
              />
            ) : (
              // Image illana Name oda 1st letter kaatum
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center text-3xl font-bold shadow-md border-4 border-white">
                {user?.name?.charAt(0).toUpperCase() || "E"}
              </div>
            )}
          </div>
        </div>
        {/* -------------------- */}

        {/* Placeholder for future Stats Cards (Total Employees, Total Salary etc.) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Inime neenga inga chinna chinna stats cards pottukalam */}
        </div>

      </div>
    </div>
  );
};

export default Summary;