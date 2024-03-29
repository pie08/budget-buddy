import styled from "styled-components";
import BudgetDetailCard from "./BudgetDetailCard";
import { getCategories } from "../../categories/getCategories";
import Heading from "../../../components/ui/Heading";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 3.2rem;
  row-gap: 2.4rem;
`;

function BudgetDetailCategories({ categoryBudgets, expenses }) {
  // get all expense categories
  const categories = getCategories("expense");

  // format category data to include budget data
  const budgetData = categories
    .map((category) => {
      // Get expenses with the current category
      const filteredExpenses = expenses.filter(
        (expense) => expense.category === category.name
      );

      const spent = filteredExpenses.reduce((acc, cur) => acc + cur.amount, 0);
      const budget = Number(categoryBudgets[category.name]) || 0;
      const overBudget = spent > budget;

      return {
        category: category.name,
        spent,
        budget,
        overBudget,
        numTransactions: filteredExpenses.length,
        colors: category.colors,
      };
    })
    .filter((category) => category.spent > 0);

  const budgetCategories = budgetData.filter((budget) => budget.budget > 0);
  const expenseCategories = budgetData.filter((budget) => budget.budget === 0);

  return (
    <Layout>
      {budgetCategories.length > 0 && (
        <Group>
          <Heading as="h2">Tracked categories</Heading>
          <Grid>
            {budgetCategories.map((budget, i) => (
              <BudgetDetailCard key={i} {...budget} />
            ))}
          </Grid>
        </Group>
      )}

      {expenseCategories.length > 0 && (
        <Group>
          <Heading as="h2">Untracked categories</Heading>
          <Grid>
            {expenseCategories.map((budget, i) => (
              <BudgetDetailCard key={i} {...budget} overBudget={false} />
            ))}
          </Grid>
        </Group>
      )}
    </Layout>
  );
}

export default BudgetDetailCategories;
