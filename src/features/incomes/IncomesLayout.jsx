import { toast } from "react-hot-toast";
import Spinner from "../../components/ui/Spinner";
import NoData from "../../components/ui/NoData";
import TransactionTable from "../../components/transactionTable/TransactionTable";
import IncomeForm from "./IncomeForm";
import { useSearchParams } from "react-router-dom";
import TransactionChart from "../../components/transactionTable/TransactionChart";
import { useIncomes } from "./useIncomes";
import { useDeleteIncome } from "./useDeleteIncome";
import { Row } from "../../components/ui/Row";
import TransactionChartOperations from "../../components/transactionTable/TransactionChartOperations";
const pageSize = import.meta.env.VITE_NUM_PER_PAGE;

function IncomesLayout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const { incomes, isLoading, error, count } = useIncomes();
  const { deleteIncome, isDeleting } = useDeleteIncome();

  if (isLoading) return <Spinner />;
  if (error) {
    toast.error(`Could not get your incomes`);
    return <NoData resource="incomes" />;
  }
  if (count === 0) {
    return <NoData resource="incomes" />;
  }

  const pageStart = pageSize * page - pageSize;
  const pageEnd = pageSize * page;
  const incomesPaginated = incomes.slice(pageStart, pageEnd);

  return (
    <>
      <TransactionTable
        transactions={incomesPaginated}
        count={count}
        formRender={(income) => <IncomeForm income={income} />}
        onDelete={deleteIncome}
        amountColor="var(--color-brand-500)"
      />

      <Row>
        <div></div>
        <TransactionChartOperations />
      </Row>

      <TransactionChart data={incomes} numDays={7} />
    </>
  );
}

export default IncomesLayout;
