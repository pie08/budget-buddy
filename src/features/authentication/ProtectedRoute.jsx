import { Navigate } from "react-router-dom";
import { useUser } from "./useUser";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useUser();

  if (!isAuthenticated) return <Navigate to="/login" />;
  return children;
}

export default ProtectedRoute;
