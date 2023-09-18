import styled from "styled-components";

const Tag = styled.div`
  padding: 0.6rem 1rem;
  border-radius: 999rem;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 1.2rem;
  width: fit-content;

  color: ${(props) => props.$textColor};
  background-color: ${(props) => props.$backgroundColor};
`;

export default Tag;
