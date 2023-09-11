import { useForm } from "react-hook-form";
import Form from "../../components/form/Form";
import FormRow from "../../components/form/FormRow";
import Input from "../../components/form/Input";
import Textarea from "../../components/form/Textarea";
import { Button } from "../../components/ui/Button";
import Select from "../../components/form/Select";
import { useUpdateIncome } from "./useUpdateIncome";
import { useCreateIncome } from "./useCreateIncome";

function IncomeForm({ onCloseModal, income }) {
  const isUpdateSession = Boolean(income);

  const { updateIncome, isUpdating } = useUpdateIncome();
  const { createIncome, isCreating } = useCreateIncome();
  const isLoading = isUpdating || isCreating;

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: isUpdateSession ? income : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    if (isUpdateSession) {
      updateIncome(
        { data, id: income.id },
        {
          onSuccess: () => {
            onCloseModal();
          },
        }
      );
    } else {
      createIncome(data, {
        onSuccess: () => {
          onCloseModal();
        },
      });
    }
  }

  return (
    <Form $type="modal" onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Title" error={errors.title?.message}>
        <Input
          disabled={isLoading}
          type="text"
          id="title"
          {...register("title", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Description" error={errors.description?.message}>
        <Textarea
          disabled={isLoading}
          type="text"
          id="description"
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Amount" error={errors.amount?.message}>
        <Input
          disabled={isLoading}
          type="number"
          id="amount"
          {...register("amount", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Category" error={errors.category?.message}>
        <Select
          disabled={isLoading}
          id="category"
          {...register("category", {
            required: true,
          })}
        >
          <option value="food">Salary</option>
          <option value="transportation">Investments</option>
          <option value="utilities">Business income</option>
          <option value="other">Other</option>
        </Select>
      </FormRow>

      <FormRow type="buttons">
        <Button
          disabled={isLoading}
          $variation="secondary"
          type="reset"
          onClick={() => {
            reset();
            onCloseModal();
          }}
        >
          Reset
        </Button>
        <Button disabled={isLoading}>
          {isUpdateSession ? "Update income" : "Add income"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default IncomeForm;
