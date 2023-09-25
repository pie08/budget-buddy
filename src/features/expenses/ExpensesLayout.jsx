import { toast } from "react-hot-toast";
import Spinner from "../../components/ui/Spinner";
import { useExpenses } from "./useExpenses";
import { useDeleteExpense } from "./useDeleteExpense";
import NoData from "../../components/ui/NoData";
import TransactionTable from "../../components/transactionTable/TransactionTable";
import ExpenseForm from "./ExpenseForm";
import { useSearchParams } from "react-router-dom";
import TransactionChart from "../../components/transactionTable/TransactionChart";
import TransactionChartOperations from "../../components/transactionTable/TransactionChartOperations";
import { Row } from "../../components/ui/Row";
const pageSize = import.meta.env.VITE_NUM_PER_PAGE;

function ExpensesLayout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const { expenses, isLoading, error, count } = useExpenses();
  const { deleteExpense, isDeleting } = useDeleteExpense();

  if (isLoading) return <Spinner />;
  if (error) {
    toast.error(`Could not get your expenses`);
    return <NoData resource="expenses" />;
  }
  if (count === 0) {
    return <NoData resource="expenses" />;
  }

  const pageStart = pageSize * page - pageSize;
  const pageEnd = pageSize * page;
  const expensesPaginated = expenses.slice(pageStart, pageEnd);

  return (
    <>
      <TransactionTable
        transactions={expensesPaginated}
        count={count}
        formRender={(expense) => <ExpenseForm expense={expense} />}
        onDelete={deleteExpense}
        amountColor="var(--color-red-700)"
      />

      <Row>
        <div></div>
        <TransactionChartOperations />
      </Row>

      <TransactionChart
        data={expenses}
        fill="var(--color-red-100)"
        stroke="var(--color-red-700)"
      />
    </>
  );
}

export default ExpensesLayout;
