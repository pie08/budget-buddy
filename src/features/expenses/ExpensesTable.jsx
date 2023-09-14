import { toast } from "react-hot-toast";
import Spinner from "../../components/ui/Spinner";
import { useExpenses } from "./useExpenses";
import { useDeleteExpense } from "./useDeleteExpense";
import NoData from "../../components/ui/NoData";
import TransactionTable from "../../components/transactionTable/TransactionTable";
import ExpenseForm from "./ExpenseForm";

function ExpensesTable() {
  const { expenses, isLoading, error, count } = useExpenses({
    paginate: true,
  });
  const { deleteExpense, isDeleting } = useDeleteExpense();

  if (isLoading) return <Spinner />;
  if (error) {
    toast.error("Could not get your expenses");
    return <NoData resource="expenses" />;
  }
  if (count === 0) {
    return <NoData resource="expenses" />;
  }

  return (
    <TransactionTable
      transactions={expenses}
      count={count}
      formRender={(expense) => <ExpenseForm expense={expense} />}
      onDelete={deleteExpense}
    />
  );
}

export default ExpensesTable;
