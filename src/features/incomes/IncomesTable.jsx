import { toast } from "react-hot-toast";
import Spinner from "../../components/ui/Spinner";
import Table from "../../components/ui/Table";
import { useIncomes } from "./useIncome";
import NoData from "../../components/ui/NoData";
import IncomeRow from "./IncomeRow";
import Pagination from "../../components/ui/Pagination";

function IncomesTable() {
  const { incomes, isLoading, error, count } = useIncomes();

  if (isLoading) return <Spinner />;
  if (error) {
    toast.error("Could not get your incomes");
    return <NoData resource="incomes" />;
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
        data={incomes}
        render={(income) => <IncomeRow income={income} key={income.id} />}
      />

      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Table>
  );
}

export default IncomesTable;
