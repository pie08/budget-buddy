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
import TableContainer from "../../components/ui/TableContainer";
import { PAGE_SIZE } from "../../utils/constants";
const pageSize = PAGE_SIZE;

function ExpensesLayout() {
  const [searchParams] = useSearchParams();
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

  // client side pagination because TransactionChart needs all expenses
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

      <TableContainer>
        <TransactionChart
          data={expenses}
          fill="var(--color-red-100)"
          stroke="var(--color-red-700)"
        />
      </TableContainer>
    </>
  );
}

export default ExpensesLayout;
