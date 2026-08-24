import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRouters from "./utils/PrivateRouters";
import RolebasedRouters from "./utils/RolebasedRouters";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRouters>
              <RolebasedRouters requiredRole={["admin"]} >
                <AdminDashboard />
              </RolebasedRouters>
            </PrivateRouters>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
``;
