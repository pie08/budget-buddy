import { styled } from "styled-components";
import MainNav from "./MainNav";

const StyledSidebar = styled.aside`
  display: flex;
  gap: 3.2rem;
  padding: 3.2rem 2.4rem;
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <MainNav />
    </StyledSidebar>
  );
}

export default Sidebar;
