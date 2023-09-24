import LoginForm from "../features/authentication/LoginForm";
import Heading from "../components/ui/Heading";
import AuthLayout from "../features/authentication/AuthLayout";
import NavigationLink from "../components/ui/NavigationLink";

function Login() {
  return (
    <AuthLayout>
      <Heading as="h1">Login to your account</Heading>
      <LoginForm />
      <NavigationLink to="/recovery">Forgot you password?</NavigationLink>
      <NavigationLink to="/signup">Need an account?</NavigationLink>
    </AuthLayout>
  );
}

export default Login;
