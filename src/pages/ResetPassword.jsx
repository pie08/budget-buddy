import { useNavigate } from "react-router-dom";
import Heading from "../components/ui/Heading";
import UpdateUserPasswordForm from "../features/authentication/UpdateUserPasswordForm";

function ResetPassword() {
  const navigate = useNavigate();

  return (
    <>
      <Heading>Update your password</Heading>
      <UpdateUserPasswordForm handleSuccess={() => navigate("/")} />
    </>
  );
}

export default ResetPassword;
