import { useForm } from "react-hook-form";
import Form from "../../components/form/Form";
import FormRow from "../../components/form/FormRow";
import Input from "../../components/form/Input";
import Textarea from "../../components/form/Textarea";
import { Button } from "../../components/ui/Button";
import { useUpdateExpense } from "./useUpdateExpense";

function UpdateExpense({ onCloseModal, expense }) {
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: expense,
  });
  const { updateExpense, isUpdating } = useUpdateExpense();

  const { errors } = formState;

  function onSubmit(data) {
    updateExpense(
      { data, id: expense.id },
      {
        onSuccess: () => {
          onCloseModal();
        },
      }
    );
  }

  return (
    <Form $type="modal" onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Title" error={errors.title?.message}>
        <Input
          disabled={isUpdating}
          type="text"
          id="title"
          {...register("title", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Description" error={errors.description?.message}>
        <Textarea
          disabled={isUpdating}
          type="text"
          id="description"
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Amount" error={errors.amount?.message}>
        <Input
          disabled={isUpdating}
          type="number"
          id="amount"
          {...register("amount", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Category" error={errors.category?.message}>
        <Input
          disabled={isUpdating}
          type="text"
          id="category"
          {...register("category", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          disabled={isUpdating}
          $variation="secondary"
          type="reset"
          onClick={() => {
            reset();
            onCloseModal();
          }}
        >
          Reset
        </Button>
        <Button disabled={isUpdating}>Update expense</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateExpense;
