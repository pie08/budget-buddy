import toast from "react-hot-toast";
import Spinner from "../../components/ui/Spinner";
import { useBudgets } from "./useBudgets";
import NoData from "../../components/ui/NoData";
import Table from "../../components/ui/Table";
import BudgetsTableRow from "./BudgetsTableRow";

function BudgetsTable() {
  const { budgets, count, isLoading, error } = useBudgets();

  if (isLoading) return <Spinner />;
  if (error) {
    toast.error(`Could not get your budgets`);
    return <NoData resource="budgets" />;
  }
  if (count === 0) {
    return <NoData resource="budgets" />;
  }
  console.log(budgets);

  return (
    <Table columns=".8fr .6fr 1fr 1fr 1fr .2fr">
      <Table.Header>
        <div>Title</div>
        <div>Spending Limit</div>
        <div>Start date</div>
        <div>End date</div>
        <div>Description</div>
        <div></div>
      </Table.Header>

      <Table.Body
        data={budgets}
        render={(budget) => <BudgetsTableRow budget={budget} key={budget.id} />}
      />
    </Table>
  );
}

export default BudgetsTable;
