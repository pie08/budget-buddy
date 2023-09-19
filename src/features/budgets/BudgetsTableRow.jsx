import { format, isFuture, isPast, isToday } from "date-fns";
import Table from "../../components/ui/Table";
import { formatCurrency } from "../../utils/Helpers";
import Menus from "../../components/ui/Menus";
import { HiOutlineEye, HiPencil, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Tag from "../../components/ui/Tag";
import { useDeleteBudget } from "./useDeleteBudget";
import Modal from "../../components/ui/Modal";
import BudgetForm from "./BudgetForm";

const SpendingLimit = styled.p`
  font-weight: 500;
  color: var(--color-blue-600);
`;

function BudgetsTableRow({ budget }) {
  const { title, startDate, endDate, spendingLimit, id } = budget;
  const navigate = useNavigate();
  const { deleteBudget, isDeleting } = useDeleteBudget();

  // calculate status
  let status = "active";

  // if cur date is before start date
  if (isFuture(new Date(startDate)) && !isToday(new Date(startDate)))
    status = "waiting";

  // if cur dat is after end date
  if (isPast(new Date(endDate)) && !isToday(new Date(endDate)))
    status = "completed";

  const statusToColor = {
    active: {
      $backgroundColor: "var(--color-brand-100)",
      $textColor: "var(--color-brand-700)",
    },
    waiting: {
      $backgroundColor: "var(--color-yellow-100)",
      $textColor: "var(--color-yellow-700)",
    },
    completed: {
      $backgroundColor: "var(--color-gray-100)",
      $textColor: "var(--color-gray-700)",
    },
  };

  return (
    <Table.Row>
      <p>{title}</p>
      <SpendingLimit>{formatCurrency(spendingLimit)}</SpendingLimit>
      <p>{format(new Date(startDate), "PPP")}</p>
      <p>{format(new Date(endDate), "PPP")}</p>
      <Tag {...statusToColor[status]}>{status}</Tag>

      <Menus.Menu>
        <Menus.Open id={`budget-${id}`} />
        <Menus.List id={`budget-${id}`}>
          <Menus.Item icon={<HiOutlineEye />} onClick={() => navigate(`${id}`)}>
            See more
          </Menus.Item>
          <Modal.Open id={`update-budget-${id}`}>
            <Menus.Item icon={<HiPencil />}>Edit</Menus.Item>
          </Modal.Open>
          <Menus.Item
            icon={<HiTrash />}
            onClick={() => deleteBudget(id)}
            disabled={isDeleting}
          >
            Delete
          </Menus.Item>
        </Menus.List>
      </Menus.Menu>

      <Modal.Window id={`update-budget-${id}`}>
        <BudgetForm budget={budget} />
      </Modal.Window>
    </Table.Row>
  );
}

export default BudgetsTableRow;
