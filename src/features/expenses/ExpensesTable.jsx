import { toast } from "react-hot-toast";
import Spinner from "../../components/ui/Spinner";
import Table from "../../components/ui/Table";
import { useExpenses } from "./useExpenses";
import NoData from "../../components/ui/NoData";
import ExpenseRow from "./ExpenseRow";
import Pagination from "../../components/ui/Pagination";

function ExpensesTable() {
  const { expenses, isLoading, error, count } = useExpenses();

  if (isLoading) return <Spinner />;
  if (error) {
    toast.error("Could not get your expenses");
    return <NoData resource="expenses" />;
  }
  if (count === 0) {
    return <NoData resource="expenses" />;
  }

  return (
    <Table columns="0.8fr 1fr 0.6fr 1fr 1fr .2fr">
      <Table.Header>
        <div>Category</div>
        <div>Title</div>
        <div>Amount</div>
        <div>Date</div>
        <div>Description</div>
        <div></div>
      </Table.Header>

      <Table.Body
        data={expenses}
        render={(expense) => <ExpenseRow expense={expense} key={expense.id} />}
      />

      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Table>
  );
}

export default ExpensesTable;
