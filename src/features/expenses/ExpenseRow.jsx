import { format } from "date-fns";
import Table from "../../components/ui/Table";
import { formatCurrency } from "../../utils/Helpers";
import {
  HiMiniArrowTopRightOnSquare,
  HiPencil,
  HiTrash,
} from "react-icons/hi2";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import Menus from "../../components/ui/Menus";
import { useDeleteExpense } from "./useDeleteExpense";
import Modal from "../../components/ui/Modal";
import UpdateExpense from "./UpdateExpense";

const StyledLink = styled(Link)`
  display: inline-block;
  padding: 0.4rem 0.6rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(-0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-gray-100);
  }

  & svg {
    color: var(--color-gray-500);
    width: 2rem;
    height: 2rem;
    transform: translateY(0.3rem);
  }
`;

const Amount = styled.p`
  color: var(--color-red-700);
  font-weight: 500;
`;

function ExpenseRow({ expense }) {
  const { deleteExpense, isDeleting } = useDeleteExpense();
  const { title, description, amount, category, created_at, id } = expense;

  return (
    <Menus>
      <Table.Row>
        <p>
          <StyledLink to={`/expenses/${expense.id}`}>
            <HiMiniArrowTopRightOnSquare />
          </StyledLink>
        </p>
        <p>{category}</p>
        <p>{title}</p>
        <Amount>{formatCurrency(amount)}</Amount>
        <p>{format(new Date(created_at), "PPP")}</p>
        <p>{description}</p>

        <Menus.Menu>
          <Menus.Open />
          <Menus.List>
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
            <UpdateExpense expense={expense} />
          </Modal.Window>
        </Menus.Menu>
      </Table.Row>
    </Menus>
  );
}

export default ExpenseRow;
