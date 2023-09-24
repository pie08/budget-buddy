import { Button } from "../components/ui/Button";
import { Row } from "../components/ui/Row";
import Heading from "../components/ui/Heading";
import Menus from "../components/ui/Menus";
import Modal from "../components/ui/Modal";
import IncomeForm from "../features/incomes/IncomeForm";
import IncomesLayout from "../features/incomes/IncomesLayout";
import IncomeTableOperations from "../features/incomes/IncomeTableOperations";
import ToolTip from "../components/ui/ToolTip";
import InfoIcon from "../components/ui/InfoIcon";

function Incomes() {
  return (
    <Modal>
      <Menus>
        <Row>
          <Row $gap={1.2}>
            <Heading>Incomes</Heading>
            <ToolTip>
              <ToolTip.Open id="income">
                <InfoIcon />
              </ToolTip.Open>
              <ToolTip.Window id="income">
                <p>
                  An income is money you recieve. <br />
                  Add one using the button below to get started.
                </p>
              </ToolTip.Window>
            </ToolTip>
          </Row>

          <IncomeTableOperations />
        </Row>

        <IncomesLayout />

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
