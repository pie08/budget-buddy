import { styled } from "styled-components";
import MainNav from "./MainNav";
import AccountOperations from "../authentication/AccountOperations";

const StyledSidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  padding: 3.2rem 2.4rem;
  box-shadow: 1px 0 1.2rem rgba(0, 0, 0, 0.05);
  z-index: 9;
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <MainNav />
      <AccountOperations />
    </StyledSidebar>
  );
}

export default Sidebar;
