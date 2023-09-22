import Form from "../../components/form/Form";
import FormRowVertical from "../../components/form/FormRowVertical";
import Input from "../../components/form/Input";
import { Button } from "../../components/ui/Button";
import { useForm } from "react-hook-form";
import { useSignUp } from "./useSignUp";

function SignUpForm() {
  const { signUp, isLoading } = useSignUp();
  const { register, handleSubmit, getValues, formState, reset } = useForm();
  const { errors } = formState;

  function onSubmit(data, e) {
    e.preventDefault();

    signUp(data, {
      onError: reset,
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical label="First name" error={errors.email?.firstName}>
        <Input
          type="text"
          id="firstName"
          disabled={isLoading}
          {...register("firstName", {
            required: "This field is required",
          })}
        />
      </FormRowVertical>
      <FormRowVertical label="Last name" error={errors.email?.lastName}>
        <Input
          type="text"
          id="lastName"
          disabled={isLoading}
          {...register("lastName", {
            required: "This field is required",
          })}
        />
      </FormRowVertical>
      <FormRowVertical label="Email" error={errors.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "This field is required",
          })}
        />
      </FormRowVertical>
      <FormRowVertical label="Password" error={errors.password?.message}>
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Too short!",
            },
          })}
        />
      </FormRowVertical>
      <FormRowVertical
        label="Confirm password"
        error={errors.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues("password") === value || "Passwords do not match",
          })}
        />
      </FormRowVertical>

      <FormRowVertical>
        <Button>Create account</Button>
      </FormRowVertical>
    </Form>
  );
}

export default SignUpForm;
