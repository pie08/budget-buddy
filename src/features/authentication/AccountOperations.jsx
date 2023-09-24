import styled from "styled-components";
import Logout from "./Logout";
import ButtonIcon from "../../components/ui/ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import UserAvatar from "./UserAvatar";

const Row = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  gap: 1.2rem;
  list-style: none;
  margin-top: auto;
`;

function AccountOperations() {
  const navigate = useNavigate();

  return (
    <Row>
      <li>
        <UserAvatar />
      </li>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <Logout />
      </li>
    </Row>
  );
}

export default AccountOperations;
