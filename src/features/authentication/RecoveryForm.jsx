import Form from "../../components/form/Form";
import FormRowVertical from "../../components/form/FormRowVertical";
import Input from "../../components/form/Input";
import { useState } from "react";
import { usePasswordReset } from "./usePasswordReset";
import { Button } from "../../components/ui/Button";

function RecoveryForm() {
  const [email, setEmail] = useState("");
  const { sendPasswordReset, isLoading } = usePasswordReset();

  function handleSubmit(e) {
    e.preventDefault();

    sendPasswordReset(email);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email">
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          required
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button>Submit</Button>
      </FormRowVertical>
    </Form>
  );
}

export default RecoveryForm;
