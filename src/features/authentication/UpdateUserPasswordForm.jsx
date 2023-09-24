import Form from "../../components/form/Form";
import FormRow from "../../components/form/FormRow";
import Input from "../../components/form/Input";
import { useUpdateUser } from "./useUpdateUser";
import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "../../services/supabase";

function UpdateUserPasswordForm({ handleSuccess }) {
  const navigate = useNavigate();

  const { updateUser, isUpdating } = useUpdateUser();
  const { register, handleSubmit, getValues, formState } = useForm();
  const { errors } = formState;

  function onSubmit(data, e) {
    e.preventDefault();

    updateUser(
      { password: data.newPassword },
      {
        onSuccess: handleSuccess,
      }
    );
  }

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(event);
    });
  }, []);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="New password" error={errors.newPassword?.message}>
        <Input
          type="password"
          id="newPassword"
          disabled={isUpdating}
          {...register("newPassword", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Too short!",
            },
          })}
        />
      </FormRow>
      <FormRow
        label="Confirm new password"
        error={errors.confirmPassword?.message}
      >
        <Input
          type="password"
          id="confirmPassword"
          disabled={isUpdating}
          {...register("confirmPassword", {
            required: "This field is required",
            validate: (value) =>
              value === getValues("newPassword") || "Passwords do not match",
          })}
        />
      </FormRow>
      <FormRow type="buttons">
        <Button $variation="secondary" onClick={() => navigate("/")}>
          Cancel
        </Button>
        <Button>Update password</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserPasswordForm;
