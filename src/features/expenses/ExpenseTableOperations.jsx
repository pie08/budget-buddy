import styled from "styled-components";
import ParamSelect from "../../components/ui/ParamSelect";
import { getCategories } from "../categories/getCategories";
import expenseCategories from "../../data/expenseCategories.json";

const Operations = styled.div`
  display: flex;
  gap: 2.4rem;
`;

function ExpenseTableOperations() {
  // get all expense categories
  const categories = getCategories("expense");

  // format category names
  const optionCategories = categories.map((category) => {
    return {
      value: category.name,
      label: category.name[0].toUpperCase() + category.name.slice(1),
    };
  });

  return (
    <Operations>
      <ParamSelect
        fieldName="category"
        options={[
          { value: "all", label: "All categories" },
          ...optionCategories,
        ]}
      />

      <ParamSelect
        fieldName="sortBy"
        options={[
          { value: "created_at-desc", label: "Sort by date (descending)" },
          { value: "created_at-asc", label: "Sort by date (ascending)" },
          { value: "amount-desc", label: "Sort by amount (descending)" },
          { value: "amount-asc", label: "Sort by amount (ascending)" },
        ]}
      />
    </Operations>
  );
}

export default ExpenseTableOperations;
