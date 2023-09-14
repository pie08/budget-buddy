import { useExpenses } from "../expenses/useExpenses";
import { useIncomes } from "../incomes/useIncomes";
import { getCategories } from "./getCategories";
import styled from "styled-components";
import CategoryCard from "./CategoryCard";
import Spinner from "../../components/ui/Spinner";
import AddCategory from "./AddCategory";

import expenseCategories from "../../data/expenseCategories.json";
import incomeCategories from "../../data/incomeCategories.json";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 3.2rem;
  row-gap: 2.4rem;
  max-height: 50vh;
  overflow: auto;
`;

// todo: Users must be able to choose either expenses or incomes for categories on categories page

function CategoriesGrid() {
  // Get all user expenses and generate an object with each expense name and relevent data
  const { expenses, isLoading } = useExpenses();
  const categories = getCategories(
    "customExpenseCategories",
    expenseCategories
  );

  if (isLoading) return <Spinner />;

  const finalCategories = categories
    .map((category) => {
      // Get expenses with the current category
      const filteredExpenses = expenses.filter(
        (expense) => expense.category === category.name
      );

      const totalAmount = filteredExpenses.reduce(
        (acc, cur) => acc + cur.amount,
        0
      );

      return {
        name: category.name,
        totalAmount,
        transactions: filteredExpenses.length,
        colors: category.colors,
      };
    })
    .filter((category) => category.transactions > 0);

  return (
    <Grid>
      {finalCategories.map(({ name, totalAmount, transactions, colors }, i) => (
        <CategoryCard
          key={i}
          name={name}
          amount={totalAmount}
          numTransactions={transactions}
          colors={colors}
        />
      ))}
      <AddCategory />
    </Grid>
  );
}

export default CategoriesGrid;
