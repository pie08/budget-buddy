import Form from "../../components/form/Form";
import FormRow from "../../components/form/FormRow";
import Input from "../../components/form/Input";

function UpdateUserPasswordForm() {
  return (
    <Form>
      <FormRow label="New password">
        <Input type="password" />
      </FormRow>
      <FormRow label="Confirm new password">
        <Input type="password" />
      </FormRow>
    </Form>
  );
}

export default UpdateUserPasswordForm;
