import Form from "../../components/form/Form";
import FormRow from "../../components/form/FormRow";
import Input from "../../components/form/Input";
import { Button } from "../../components/ui/Button";
import FileInput from "../../components/ui/FileInput";
import { useUpdateUser } from "./useUpdateUser";
import { useUser } from "./useUser";
import { useState } from "react";

function UpdateUserDataForm() {
  const {
    user: {
      email,
      user_metadata: { firstName: currentFirstName, lastName: currentLastName },
    },
  } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();

  const [firstName, setFirstName] = useState(currentFirstName);
  const [lastName, setLastName] = useState(currentLastName);
  const [avatar, setAvatar] = useState(null);

  function handleCancel() {
    setFirstName(currentFirstName);
    setLastName(currentLastName);
    setAvatar(null);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!firstName || !lastName) return;

    updateUser({ firstName, lastName, avatar });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email">
        <Input type="text" id="email" value={email} disabled />
      </FormRow>
      <FormRow label="First name">
        <Input
          type="text"
          id="firstName"
          value={firstName}
          disabled={isUpdating}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </FormRow>
      <FormRow label="Last name">
        <Input
          type="text"
          id="lastName"
          value={lastName}
          disabled={isUpdating}
          onChange={(e) => setLastName(e.target.value)}
        />
      </FormRow>
      <FormRow label="Avatar">
        <FileInput
          id="avatar"
          disabled={isUpdating}
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormRow>

      <FormRow type="buttons">
        <Button
          disabled={isUpdating}
          $variation="secondary"
          type="reset"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update info</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
