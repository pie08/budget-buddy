import { toast } from "react-hot-toast";
import Spinner from "../../components/ui/Spinner";
import { useIncomes } from "./useIncomes";
import { useDeleteIncome } from "./useDeleteIncome";
import NoData from "../../components/ui/NoData";
import IncomeForm from "./IncomeForm";
import TransactionTable from "../../components/transactionTable/TransactionTable";

function IncomesTable() {
  const { incomes, isLoading, error, count } = useIncomes({
    paginate: true,
  });
  const { deleteIncome, isDeleting } = useDeleteIncome();

  if (isLoading) return <Spinner />;
  if (error) {
    toast.error("Could not get your incomes");
    return <NoData resource="incomes" />;
  }
  if (count === 0) {
    return <NoData resource="incomes" />;
  }

  return (
    <TransactionTable
      transactions={incomes}
      count={count}
      formRender={(income) => <IncomeForm income={income} />}
      onDelete={deleteIncome}
    />
  );
}

export default IncomesTable;
