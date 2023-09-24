import Heading from "./Heading";
import NavigationLink from "./NavigationLink";
import AuthLayout from "../../features/authentication/AuthLayout";

function EmailConfirmation() {
  return (
    <AuthLayout>
      <Heading>Please check you email for a link!</Heading>
      <NavigationLink to="/login">Back to login</NavigationLink>
    </AuthLayout>
  );
}

export default EmailConfirmation;
