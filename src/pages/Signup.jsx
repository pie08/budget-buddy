import styled from "styled-components";
import Heading from "../components/ui/Heading";
import SignUpForm from "../components/authentication/SignUpForm";
import { Link } from "react-router-dom";
import AuthLayout from "../components/authentication/AuthLayout";

const Login = styled(Link)`
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

function Signup() {
  return (
    <AuthLayout>
      <Heading as="h1">Create an account</Heading>
      <SignUpForm />
      <Login to="/login">Already have an account?</Login>
    </AuthLayout>
  );
}

export default Signup;
