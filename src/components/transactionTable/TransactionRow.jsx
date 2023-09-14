import { format } from "date-fns";
import Table from "../../components/ui/Table";
import { formatCurrency } from "../../utils/Helpers";
import { HiPencil, HiTrash } from "react-icons/hi2";
import { styled } from "styled-components";
import Menus from "../../components/ui/Menus";
import Modal from "../../components/ui/Modal";

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

function TransactionRow({ transaction, formRender, onDelete }) {
  const { title, description, amount, category, created_at, id } = transaction;

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
        <Menus.Open id={`${id}`} />
        <Menus.List id={`${id}`}>
          <Modal.Open id={`edit-transaction-${id}`}>
            <Menus.Item icon={<HiPencil />}>Edit</Menus.Item>
          </Modal.Open>
          <Menus.Item icon={<HiTrash />} onClick={() => onDelete(id)}>
            Delete
          </Menus.Item>
        </Menus.List>

        <Modal.Window id={`edit-transaction-${id}`}>
          {formRender(transaction)}
        </Modal.Window>
      </Menus.Menu>
    </Table.Row>
  );
}

export default TransactionRow;
