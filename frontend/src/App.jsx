import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRouters from "./utils/PrivateRouters";
import RolebasedRouters from "./utils/RolebasedRouters";
import DashBoardSummary from "./components/DashBoardSummary";
import Departments from "./pages/Departments";
import DepartmentForm from "./components/Department/DepartmentForm";
import EmpList from "./components/Employee/EmpList";
import EmpAdd from "./components/Employee/EmpAdd";
import EmpView from "./components/Employee/EmpView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/login" element={<Login />} />
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

          <Route path="/admin-dashboard/employees" element={<EmpList />} />
          <Route path="/admin-dashboard/employees-form" element={<EmpAdd />} />
          <Route path="/admin-dashboard/employees-form/:id" element={<EmpView />} />
          <Route path="/admin-dashboard/employees-form-edit/:id" element={<EmpAdd />} />


        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
