import styled from "styled-components";
import LoginForm from "../components/authentication/LoginForm";
import Heading from "../components/ui/Heading";
import { Link } from "react-router-dom";
import AuthLayout from "../components/authentication/AuthLayout";

const Signup = styled(Link)`
  font-size: 1.4rem;
  text-decoration: none;
  color: var(--color-brand-600);
  border-bottom: 1px solid var(--color-brand-600);
  transition: all 0.2s;

  &:hover {
    color: var(--color-brand-500);
    border-bottom: 1px solid var(--color-brand-500);
  }
`;

function Login() {
  return (
    <AuthLayout>
      <Heading as="h1">Login to your account</Heading>
      <LoginForm />
      <Signup to="/signup">Need an account?</Signup>
    </AuthLayout>
  );
}

export default Login;
