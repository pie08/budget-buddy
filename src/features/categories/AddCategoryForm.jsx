import { useState } from "react";
import Form from "../../components/form/Form";
import FormRow from "../../components/form/FormRow";
import Input from "../../components/form/Input";
import Select from "../../components/form/Select";
import { Button } from "../../components/ui/Button";
import { addCustomCategory } from "./addCustomCategory";
import toast from "react-hot-toast";

function AddCategoryForm({ onCloseModal }) {
  const [type, setType] = useState("expense");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    setErrors({});

    if (name.length > 20) {
      setErrors((err) => {
        return { ...err, name: "Name is too long!" };
      });
    }

    // return if any errors
    if (Object.entries(errors).length !== 0) return;

    const localStorageKeys = [];
    if (type === "expense") localStorageKeys.push("customExpenseCategories");
    if (type === "income") localStorageKeys.push("customIncomeCategories");
    if (type === "both")
      localStorageKeys.push(
        "customIncomeCategories",
        "customExpenseCategories"
      );

    localStorageKeys.forEach((key) => addCustomCategory(key, name));
    toast.success("Category successfully created");
    onCloseModal();
  }

  return (
    <Form $type="modal" onSubmit={handleSubmit}>
      <FormRow label="Type" error={errors.type}>
        <Select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="expense">For Expense</option>
          <option value="income">For Income</option>
          <option value="both">For Both</option>
        </Select>
      </FormRow>
      <FormRow label="Category Name" error={errors.name}>
        <Input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormRow>
      <FormRow type="buttons">
        <Button $variation="secondary" type="reset" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button>Add category</Button>
      </FormRow>
    </Form>
  );
}

export default AddCategoryForm;
