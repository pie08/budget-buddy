import { useState } from "react";
import Form from "../../components/form/Form";
import FormRow from "../../components/form/FormRow";
import Select from "../../components/form/Select";
import { Button } from "../../components/ui/Button";
import { deleteCustomCategory } from "./deleteCustomCategory";
import toast from "react-hot-toast";
import { getLocalStorage } from "../../utils/getLocalStorage";
import {
  CUSTOM_EXPENSE_CATEGORIES_KEY,
  CUSTOM_INCOME_CATEGORIES_KEY,
} from "../../utils/constants";

function DeleteCategoryForm({ onCloseModal }) {
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState({});
  let categories = [];

  if (type === "expense")
    categories = getLocalStorage(CUSTOM_EXPENSE_CATEGORIES_KEY);

  if (type === "income")
    categories = getLocalStorage(CUSTOM_INCOME_CATEGORIES_KEY);

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
    if (type === "expense") localStorageKey = CUSTOM_EXPENSE_CATEGORIES_KEY;
    if (type === "income") localStorageKey = CUSTOM_INCOME_CATEGORIES_KEY;

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
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
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
