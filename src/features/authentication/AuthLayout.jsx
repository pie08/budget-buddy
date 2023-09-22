import { Navigate } from "react-router-dom";
import { useUser } from "./useUser";
import styled from "styled-components";

const Layout = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3.2rem;
`;

function AuthLayout({ children }) {
  const { isAuthenticated } = useUser();

  if (isAuthenticated) return <Navigate to="/dashboard" />;

  return <Layout>{children}</Layout>;
}

export default AuthLayout;
