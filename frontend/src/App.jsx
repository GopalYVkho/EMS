import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRouters from "./utils/PrivateRouters";
import RolebasedRouters from "./utils/RolebasedRouters";
import DashBoardSummary from "./components/DashBoardSummary";
import Departments from "./pages/Departments";
import DepartmentForm from "./components/Department/DepartmentForm";

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
              <RolebasedRouters requiredRole={["admin"]}>
                <AdminDashboard />
              </RolebasedRouters>
            </PrivateRouters>
          }>
          <Route index element={<DashBoardSummary />}></Route>

          <Route path="/admin-dashboard/departments" element={<Departments />} />
          <Route path="/admin-dashboard/departments-form" element={<DepartmentForm />} />
          <Route path="/admin-dashboard/departments-form/:id" element={<DepartmentForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
