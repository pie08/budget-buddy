import styled from "styled-components";
import Heading from "../components/ui/Heading";
import SignUpForm from "../components/authentication/SignUpForm";
import { Link } from "react-router-dom";

const Layout = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3.2rem;
`;

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
    <Layout>
      <Heading as="h1">Create an account</Heading>
      <SignUpForm />
      <Login>Already have an account?</Login>
    </Layout>
  );
}

export default Signup;
