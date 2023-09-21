import { useExpenses } from "../../expenses/useExpenses";
import Spinner from "../../../components/ui/Spinner";
import styled from "styled-components";
import BudgetDetailCard from "./BudgetDetailCard";
import { getCategories } from "../../categories/getCategories";
import expenseCategoriesJson from "../../../data/expenseCategories.json";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 3.2rem;
  row-gap: 2.4rem;
`;

function BudgetDetailGrid({ categoryBudgets }) {
  // todo: only get expenses in between start and end dates
  // todo: refactor data into parent component
  const { expenses, isLoading } = useExpenses();

  if (isLoading) return <Spinner />;

  const categories = getCategories(
    "customExpenseCategories",
    expenseCategoriesJson
  );

  const budgetData = categories
    .map((category) => {
      // Get expenses with the current category
      const filteredExpenses = expenses.filter(
        (expense) => expense.category === category.name
      );

      const spent = filteredExpenses.reduce((acc, cur) => acc + cur.amount, 0);
      const budget = Number(categoryBudgets[category.name]) || 0;

      return {
        name: category.name,
        spent,
        budget,
        transactions: filteredExpenses.length,
        colors: category.colors,
      };
    })
    .filter((category) => category.spent > 0);

  const budgetCategories = budgetData.filter((budget) => budget.budget > 0);
  const expenseCategories = budgetData.filter((budget) => budget.budget === 0);

  return (
    <Grid>
      {budgetCategories.map((budget, i) => (
        <BudgetDetailCard key={i} {...budget} />
      ))}
      {expenseCategories.map((budget, i) => (
        <BudgetDetailCard key={i} {...budget} />
      ))}
    </Grid>
  );
}

export default BudgetDetailGrid;
