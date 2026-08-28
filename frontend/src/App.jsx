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
import AddSalary from "./pages/AddSalary";
import SalaryHistory from "./components/Salary/SalaryHistory";
import Dashboard from "./pages/Dashboard";
import Summary from "./components/EmployeeDashboard.jsx/Summary";
import LeaveIndex from "./components/Leave/LeaveIndex";
import LeaveAdd from "./components/Leave/LeaveAdd";

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
          }
        >
          <Route index element={<DashBoardSummary />}></Route>

          <Route
            path="/admin-dashboard/departments"
            element={<Departments />}
          />
          <Route
            path="/admin-dashboard/departments-form"
            element={<DepartmentForm />}
          />
          <Route
            path="/admin-dashboard/departments-form/:id"
            element={<DepartmentForm />}
          />

          <Route path="/admin-dashboard/employees" element={<EmpList />} />
          <Route path="/admin-dashboard/employees-form" element={<EmpAdd />} />
          <Route
            path="/admin-dashboard/employees-form/:id"
            element={<EmpView />}
          />
          <Route
            path="/admin-dashboard/employees-form-edit/:id"
            element={<EmpAdd />}
          />

          <Route path="/admin-dashboard/salary" element={<AddSalary />} />
          <Route
            path="/admin-dashboard/departments-form/salary/:id"
            element={<SalaryHistory />}
          />
        </Route>



        <Route
          path="/employee-dashboard"
          element={
            <PrivateRouters>
              <RolebasedRouters requiredRole={["admin","employee"]}>
                <Dashboard />
              </RolebasedRouters>
            </PrivateRouters>
          }
        >
          <Route index element={<Summary />}></Route>
          <Route
            path="/employee-dashboard/employees/:id"
            element={<EmpView />}
          />

          {/* leave */}
          <Route
            path="/employee-dashboard/leave"
            element={<LeaveIndex />}
          />

          <Route path="/employee-dashboard/leave/add" element={<LeaveAdd />} />


          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
