import { NavLink } from "react-router-dom";
import { styled } from "styled-components";
import {
  HiOutlineArchiveBox,
  HiOutlineBanknotes,
  HiOutlineChartBar,
  HiOutlineHome,
  HiOutlineWallet,
} from "react-icons/hi2";

const NavList = styled.ul`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  list-style: none;
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: var(--color-gray-700);
  font-weight: 500;
  padding: 1.2rem 2.4rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.2rem;

  & svg {
    transition: all 0.2s;
    height: 2.4rem;
    width: 2.4rem;
    color: var(--color-gray-400);
  }

  &:hover,
  &.active {
    background-color: var(--color-gray-50);
  }

  &:hover svg,
  &.active svg {
    color: var(--color-brand-600);
  }
`;

function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledLink to="/dashboard">
            <HiOutlineHome /> Home
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/expenses">
            <HiOutlineBanknotes /> Expenses
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/incomes">
            <HiOutlineChartBar /> Income
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/categories">
            <HiOutlineArchiveBox /> Categories
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/budgets">
            <HiOutlineWallet /> Budget
          </StyledLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
