import { toast } from "react-hot-toast";
import Spinner from "../../components/ui/Spinner";
import Table from "../../components/ui/Table";
import { useExpenses } from "./useExpenses";
import NoData from "../../components/ui/NoData";
import ExpenseRow from "./ExpenseRow";

function ExpensesTable() {
  const { expenses, isLoading, error } = useExpenses();

  if (isLoading) return <Spinner />;
  if (error) {
    toast.error("Could not get your expenses");
    return <NoData resource="expenses" />;
  }

  return (
    <Table columns=".2fr 0.6fr 1fr 0.6fr 1fr 1fr .2fr">
      <Table.Header>
        <div></div>
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
    </Table>
  );
}

export default ExpensesTable;
