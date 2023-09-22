import { useState } from "react";
import Form from "../../components/form/Form";
import FormRowVertical from "../../components/form/FormRowVertical";
import Input from "../../components/form/Input";
import { Button } from "../../components/ui/Button";
import { useLogin } from "./useLogin";

function LoginForm() {
  const { login, isLoading } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
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
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          required
        />
      </FormRowVertical>

      <FormRowVertical>
        <Button>Login</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
