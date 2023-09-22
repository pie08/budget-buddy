import { useState } from "react";
import Form from "../form/Form";
import FormRowVertical from "../form/FormRowVertical";
import Input from "../form/Input";
import { Button } from "../ui/Button";
import { useLogin } from "./useLogin";
import { useUser } from "./useUser";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const { login, isLoading } = useLogin();
  const { isAuthenticated } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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

  if (isAuthenticated) return navigate("/dashboard");

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
