import { Link } from "react-router-dom";
import styled from "styled-components";

const NavigationLink = styled(Link)`
  font-size: 1.4rem;
  text-decoration: none;
  color: var(--color-brand-600);
  border-bottom: 1px solid var(--color-brand-600);
  transition: all 0.2s;

  &:hover {
    color: var(--color-brand-500);
    border-bottom: 1px solid var(--color-brand-500);
  }
`;

export default NavigationLink;
