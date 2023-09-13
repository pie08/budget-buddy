import { format } from "date-fns";
import Table from "../../components/ui/Table";
import { formatCurrency } from "../../utils/Helpers";
import { HiPencil, HiTrash } from "react-icons/hi2";
import { styled } from "styled-components";
import Menus from "../../components/ui/Menus";
import { useDeleteExpense } from "./useDeleteExpense";
import Modal from "../../components/ui/Modal";
import ExpenseForm from "./ExpenseForm";

const Amount = styled.p`
  color: var(--color-red-700);
  font-weight: 500;
`;

const Category = styled.p`
  text-transform: capitalize;
`;

const Description = styled.p`
  overflow: auto;
`;

function ExpenseRow({ expense }) {
  const { deleteExpense, isDeleting } = useDeleteExpense();
  const { title, description, amount, category, created_at, id } = expense;

  return (
    <Table.Row>
      <Category>{category}</Category>
      <p>{title}</p>
      <Amount>{formatCurrency(amount)}</Amount>
      <p>{format(new Date(created_at), "PPP")}</p>
      <Description>
        {description.length > 25
          ? description.slice(0, 25) + " ..."
          : description}
      </Description>

      <Menus.Menu>
        <Menus.Open id={`${expense.id}`} />
        <Menus.List id={`${expense.id}`}>
          <Modal.Open id={`edit-expense-${id}`}>
            <Menus.Item icon={<HiPencil />}>Edit</Menus.Item>
          </Modal.Open>
          <Menus.Item
            icon={<HiTrash />}
            onClick={() => deleteExpense(id)}
            disabled={isDeleting}
          >
            Delete
          </Menus.Item>
        </Menus.List>

        <Modal.Window id={`edit-expense-${id}`}>
          <ExpenseForm expense={expense} />
        </Modal.Window>
      </Menus.Menu>
    </Table.Row>
  );
}

export default ExpenseRow;
