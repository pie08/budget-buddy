import { format } from "date-fns";
import Table from "../../components/ui/Table";
import { formatCurrency } from "../../utils/Helpers";
import { HiPencil, HiTrash } from "react-icons/hi2";
import { styled } from "styled-components";
import Menus from "../../components/ui/Menus";
import { useDeleteIncome } from "./useDeleteIncome";
import Modal from "../../components/ui/Modal";
import IncomeForm from "./IncomeForm";

const Amount = styled.p`
  color: var(--color-brand-600);
  font-weight: 500;
`;

const Category = styled.p`
  text-transform: capitalize;
`;

const Description = styled.p`
  overflow: auto;
`;

function IncomeRow({ income }) {
  const { deleteIncome, isDeleting } = useDeleteIncome();
  const { title, description, amount, category, created_at, id } = income;

  return (
    <Menus>
      <Table.Row>
        <Category>{category}</Category>
        <Category>{title}</Category>
        <Amount>{formatCurrency(amount)}</Amount>
        <Category>{format(new Date(created_at), "PPP")}</Category>
        <Description>
          {description.length > 25
            ? description.slice(0, 25) + " ..."
            : description}
        </Description>

        <Menus.Menu>
          <Menus.Open />
          <Menus.List>
            <Modal.Open id={`edit-income-${id}`}>
              <Menus.Item icon={<HiPencil />}>Edit</Menus.Item>
            </Modal.Open>
            <Menus.Item
              icon={<HiTrash />}
              onClick={() => deleteIncome(id)}
              disabled={isDeleting}
            >
              Delete
            </Menus.Item>
          </Menus.List>

          <Modal.Window id={`edit-income-${id}`}>
            <IncomeForm income={income} />
          </Modal.Window>
        </Menus.Menu>
      </Table.Row>
    </Menus>
  );
}

export default IncomeRow;
