import Heading from "../components/ui/Heading";
import SignUpForm from "../features/authentication/SignUpForm";
import AuthLayout from "../features/authentication/AuthLayout";
import NavigationLink from "../components/ui/NavigationLink";

function Signup() {
  return (
    <AuthLayout>
      <Heading as="h1">Create an account</Heading>
      <SignUpForm />
      <NavigationLink to="/login">Already have an account?</NavigationLink>
    </AuthLayout>
  );
}

export default Signup;
