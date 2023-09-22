import styled from "styled-components";
import Logout from "./Logout";

const Row = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  gap: 1.2rem;
  list-style: none;
  margin-top: auto;
`;

function AccountOperations() {
  return (
    <Row>
      <li>
        <Logout />
      </li>
    </Row>
  );
}

export default AccountOperations;