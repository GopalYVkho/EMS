import { useAuth } from "../context/auth";

const AdminDashboard = () => {
  const { user } = useAuth();
  console.log(user)
  return <div>AdminDashboard {user?.name}</div>;
};

export default AdminDashboard;
