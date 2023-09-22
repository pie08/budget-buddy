import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  if (isAuthenticated) return navigate("/dashboard");

  return <Layout>{children}</Layout>;
}

export default AuthLayout;
