import styled from "styled-components";
import ParamSelect from "../../components/ui/ParamSelect";
import { getCategories } from "../categories/getCategories";
import incomeCategories from "../../data/incomeCategories.json";

const Operations = styled.div`
  display: flex;
  gap: 2.4rem;
`;

function IncomeTableOperations() {
  // get all income categories
  const categories = getCategories("customIncomeCategories", incomeCategories);

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
          { value: "created_at-asc", label: "Sort by date (ascending)" },
          { value: "created_at-desc", label: "Sort by date (descending)" },
          { value: "amount-asc", label: "Sort by amount (ascending)" },
          { value: "amount-desc", label: "Sort by amount (descending)" },
        ]}
      />
    </Operations>
  );
}

export default IncomeTableOperations;
