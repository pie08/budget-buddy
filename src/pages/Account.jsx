import { Button } from "../components/ui/Button";
import Heading from "../components/ui/Heading";
import { Row } from "../components/ui/Row";
import UpdateUserPasswordForm from "../features/authentication/UpdateUSerPasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";

function Account() {
  return (
    <>
      <Heading>Update account</Heading>

      <Row $type="vertical">
        <Heading as="h3">Account information</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row $type="vertical">
        <Heading as="h3">Account password</Heading>
        <UpdateUserPasswordForm />
      </Row>
    </>
  );
}

export default Account;
