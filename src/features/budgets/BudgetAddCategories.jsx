import styled from "styled-components";
import { Button } from "../../components/ui/Button";
import { HiXMark } from "react-icons/hi2";
import Select from "../../components/form/Select";
import Input from "../../components/form/Input";

const AddCategories = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Category = styled.li`
  display: flex;
  gap: 1.2rem;
  align-items: center;

  & input {
    flex-grow: 1;
  }
`;

const Amount = styled.p`
  color: var(--color-gray-400);
  font-weight: 500;
`;

const DeleteButton = styled.button`
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  & svg {
    width: 1.6rem;
    height: 1.6rem;
  }

  &:hover {
    background-color: var(--color-gray-100);
  }
`;

function BudgetAddCategories({
  dispatch,
  categories,
  categoryBudgets,
  totalCategoryBudgetAmount,
  spendingLimit,
}) {
  // dispatcher functions
  function handleUpdateBudgetCategory(key, newKey) {
    dispatch({ type: "updateBudgetCategory", payload: { key, newKey } });
  }

  function handleAddCategoryBudget(payload) {
    dispatch({ type: "addCategoryBudget", payload });
  }

  function handleUpdateBudgetAmount(key, value) {
    dispatch({ type: "updateBudgetAmount", payload: { key, value } });
  }

  function handleDeleteCategoryBudget(key) {
    dispatch({ type: "deleteCategoryBudget", payload: key });
  }

  return (
    <AddCategories>
      <Button
        $size="small"
        $variation="secondary"
        onClick={(e) => {
          e.preventDefault();
          handleAddCategoryBudget({ Select: 0 });
        }}
      >
        Add category
      </Button>

      {Object.entries(categoryBudgets).map(([category, amount], i) => (
        <Category key={i}>
          <DeleteButton
            onClick={(e) => {
              e.preventDefault();
              handleDeleteCategoryBudget(category);
            }}
          >
            <HiXMark />
          </DeleteButton>

          <Select
            value={category}
            onChange={(e) => {
              e.preventDefault();
              handleUpdateBudgetCategory(category, e.target.value);
            }}
          >
            <option value="">Select...</option>
            {categories.map((category, i) => (
              <option key={i} value={category.name}>
                {category.name[0].toUpperCase() + category.name.slice(1)}
              </option>
            ))}
          </Select>

          <Input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => {
              e.preventDefault();
              handleUpdateBudgetAmount(category, e.target.value);
            }}
          />
        </Category>
      ))}

      {Object.keys(categoryBudgets).length > 0 && (
        <Amount>
          {totalCategoryBudgetAmount} / {spendingLimit}
        </Amount>
      )}
    </AddCategories>
  );
}

export default BudgetAddCategories;
