import styled from "styled-components";
import ParamSelect from "../../components/ui/ParamSelect";
import { getCategories } from "../categories/getCategories";
import expenseCategories from "../../data/expenseCategories.json";

const Operations = styled.div`
  display: flex;
  gap: 2.4rem;
`;

function ExpenseTableOperations() {
  const categories = getCategories(
    "customExpenseCategories",
    expenseCategories
  );

  const optionCategories = categories.map((category) => {
    return {
      value: category.name,
      label: category.name[0].toUpperCase() + category.name.slice(1),
    };
  });

  return (
    <Operations>
      <ParamSelect
        options={[
          { value: "all", label: "All categories" },
          ...optionCategories,
        ]}
        fieldName="category"
        defaultValue="all"
      />

      <ParamSelect
        options={[
          { value: "created_at-asc", label: "Sort by date (ascending)" },
          { value: "created_at-desc", label: "Sort by date (descending)" },
          { value: "amount-asc", label: "Sort by amount (ascending)" },
          { value: "amount-desc", label: "Sort by amount (descending)" },
        ]}
        fieldName="sortBy"
        defaultValue="created_at-asc"
      />
    </Operations>
  );
}

export default ExpenseTableOperations;
