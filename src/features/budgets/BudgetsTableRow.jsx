import { format } from "date-fns";
import Table from "../../components/ui/Table";
import { formatCurrency } from "../../utils/Helpers";
import Menus from "../../components/ui/Menus";
import { HiOutlineEye } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Description = styled.p`
  overflow: auto;
`;

const SpendingLimit = styled.p`
  font-weight: 500;
  color: #0891b2;
`;

function BudgetsTableRow({ budget }) {
  const { title, description, startDate, endDate, spendingLimit, id } = budget;
  const navigate = useNavigate();

  return (
    <Table.Row>
      <p>{title}</p>
      <SpendingLimit>{formatCurrency(spendingLimit)}</SpendingLimit>
      <p>{format(new Date(startDate), "PPP")}</p>
      <p>{format(new Date(endDate), "PPP")}</p>
      <Description>{description}</Description>

      <Menus.Menu>
        <Menus.Open id={`budget-${id}`} />
        <Menus.List id={`budget-${id}`}>
          <Menus.Item icon={<HiOutlineEye />} onClick={() => navigate(`${id}`)}>
            See more
          </Menus.Item>
        </Menus.List>
      </Menus.Menu>
    </Table.Row>
  );
}

export default BudgetsTableRow;
