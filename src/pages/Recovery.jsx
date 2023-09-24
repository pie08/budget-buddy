import Heading from "../components/ui/Heading";
import NavigationLink from "../components/ui/NavigationLink";
import AuthLayout from "../features/authentication/AuthLayout";
import RecoveryForm from "../features/authentication/RecoveryForm";

function Recovery() {
  return (
    <AuthLayout>
      <Heading>Reset your password</Heading>
      <RecoveryForm />
      <NavigationLink to="/login">Already have an account?</NavigationLink>
    </AuthLayout>
  );
}

export default Recovery;
