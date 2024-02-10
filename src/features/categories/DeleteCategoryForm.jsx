import { useState } from "react";
import Form from "../../components/form/Form";
import FormRow from "../../components/form/FormRow";
import Select from "../../components/form/Select";
import { getCategories } from "./getCategories";
import { Button } from "../../components/ui/Button";
import { deleteCustomCategory } from "./deleteCustomCategory";
import toast from "react-hot-toast";

function DeleteCategoryForm({ onCloseModal }) {
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState({});
  let categories = [];

  if (type === "expense")
    categories = getCategories("customExpenseCategories", []);

  if (type === "income")
    categories = getCategories("customIncomeCategories", []);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors({});

    // if no category is selected
    if (category === "")
      setErrors((err) => {
        return { ...err, category: "Category cannot be blank!" };
      });

    // if any errors return
    if (Object.entries(errors).length > 0) return;

    // generate local storage key
    let localStorageKey = "";
    if (type === "expense") localStorageKey = "customExpenseCategories";
    if (type === "income") localStorageKey = "customIncomeCategories";

    // delete category, it's ok to delete a category that has transactions in it because when the data is refetched the category will be created again
    deleteCustomCategory(localStorageKey, category);

    toast.success("Successfully deleted category");
    onCloseModal();
  }

  return (
    <Form $type="modal" onSubmit={handleSubmit}>
      <FormRow label="Type">
        <Select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="expense">For Expense</option>
          <option value="income">For Income</option>
        </Select>
      </FormRow>
      <FormRow label="Category" error={errors.category}>
        <Select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select...</option>
          {categories.map(({ name }) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </Select>
      </FormRow>
      <FormRow type="buttons">
        <Button $variation="secondary" type="cancel" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button>Delete category</Button>
      </FormRow>
    </Form>
  );
}

export default DeleteCategoryForm;
