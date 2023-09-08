import { Button } from "../components/ui/Button";
import Heading from "../components/ui/Heading";
import Modal from "../components/ui/Modal";
import AddExpense from "../features/expenses/AddExpense";
import ExpensesTable from "../features/expenses/ExpensesTable";

function Expenses() {
  return (
    <Modal>
      <Heading>Expenses</Heading>

      <ExpensesTable />

      <span>
        <Modal.Open id="new-expense">
          <Button>Add expense</Button>
        </Modal.Open>
        <Modal.Window id="new-expense">
          <AddExpense />
        </Modal.Window>
      </span>
    </Modal>
  );
}

export default Expenses;
