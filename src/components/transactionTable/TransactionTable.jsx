import Table from "../../components/ui/Table";
import TransactionRow from "./TransactionRow";
import Pagination from "../../components/ui/Pagination";
import NoData from "../ui/NoData";
import toast from "react-hot-toast";

function TransactionTable({
  transactions,
  formRender,
  count,
  onDelete,
  resourceName = "queries",
  error,
  amountColor,
}) {
  if (error) {
    toast.error(`Could not get your ${resourceName}`);
    return <NoData resource={resourceName} />;
  }
  if (count === 0) {
    return <NoData resource={resourceName} />;
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
        data={transactions}
        render={(transaction) => (
          <TransactionRow
            transaction={transaction}
            key={transaction.id}
            formRender={formRender}
            onDelete={onDelete}
            amountColor={amountColor}
          />
        )}
      />

      {count && (
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      )}
    </Table>
  );
}

export default TransactionTable;
