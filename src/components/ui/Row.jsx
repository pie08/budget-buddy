import styled, { css } from "styled-components";

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${(props) =>
    props.$type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.2rem;
      align-items: stretch;
    `}

  ${(props) => css`
    gap: ${props.$gap}rem;
  `}

  ${(props) =>
    props.$alignStart &&
    css`
      align-items: start;
    `}
`;
