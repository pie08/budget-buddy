import { useNavigate } from "react-router-dom";
import { useUser } from "./useUser";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  if (!isAuthenticated) return navigate("/login");
  return children;
}

export default ProtectedRoute;
