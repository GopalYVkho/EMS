import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  if (loading) {
    return <div>loading...</div>;
  }

  if (!user) {
    navigate("/login");
  }
  return <div>AdminDashboard {user?.name}</div>;
};

export default AdminDashboard;
