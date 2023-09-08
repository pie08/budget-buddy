import { useForm } from "react-hook-form";
import Form from "../../components/form/Form";
import FormRow from "../../components/form/FormRow";
import Input from "../../components/form/Input";
import Textarea from "../../components/form/Textarea";
import { Button } from "../../components/ui/Button";
import { useCreateExpense } from "./useCreateExpense";

function AddExpense({ onCloseModal }) {
  const { register, handleSubmit, formState, reset } = useForm();
  const { createExpense, isCreating } = useCreateExpense();

  const { errors } = formState;

  function onSubmit(data) {
    createExpense(data, {
      onSuccess: () => {
        onCloseModal();
      },
    });
  }

  return (
    <Form $type="modal" onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Title" error={errors.title?.message}>
        <Input
          disabled={isCreating}
          type="text"
          id="title"
          {...register("title", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Description" error={errors.description?.message}>
        <Textarea
          disabled={isCreating}
          type="text"
          id="description"
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Amount" error={errors.amount?.message}>
        <Input
          disabled={isCreating}
          type="number"
          id="amount"
          {...register("amount", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Category" error={errors.category?.message}>
        <Input
          disabled={isCreating}
          type="text"
          id="category"
          {...register("category", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          disabled={isCreating}
          $variation="secondary"
          type="reset"
          onClick={() => {
            reset();
            onCloseModal();
          }}
        >
          Reset
        </Button>
        <Button disabled={isCreating}>Add expense</Button>
      </FormRow>
    </Form>
  );
}

export default AddExpense;
