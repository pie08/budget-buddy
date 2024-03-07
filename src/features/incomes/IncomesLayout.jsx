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
import TableContainer from "../../components/ui/TableContainer";
import { PAGE_SIZE } from "../../utils/constants";
const pageSize = PAGE_SIZE;

function IncomesLayout() {
  const [searchParams] = useSearchParams();
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

  // client site pagination because TransactionChart needs all incomes
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

      <TableContainer>
        <TransactionChart data={incomes} />
      </TableContainer>
    </>
  );
}

export default IncomesLayout;
