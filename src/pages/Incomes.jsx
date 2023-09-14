import { Button } from "../components/ui/Button";
import { Row } from "../components/ui/Row";
import Heading from "../components/ui/Heading";
import Menus from "../components/ui/Menus";
import Modal from "../components/ui/Modal";
import IncomeForm from "../features/incomes/IncomeForm";
import IncomesTable from "../features/incomes/IncomesTable";
import IncomeTableOperations from "../features/incomes/IncomeTableOperations";

function Incomes() {
  return (
    <Modal>
      <Menus>
        <Row>
          <Heading>Incomes</Heading>

          <IncomeTableOperations />
        </Row>

        <IncomesTable />

        <span>
          <Modal.Open id="new-income">
            <Button>Add income</Button>
          </Modal.Open>
          <Modal.Window id="new-income">
            <IncomeForm />
          </Modal.Window>
        </span>
      </Menus>
    </Modal>
  );
}

export default Incomes;
