import { css, styled } from "styled-components";

const size = {
  small: css`
    padding: 0.6rem 1.8rem;
    font-size: 1.4rem;
  `,
  medium: css`
    padding: 1.4rem 3.2rem;
    font-size: 1.6rem;
  `,
  large: css`
    padding: 1.4rem 3.2rem;
    font-size: 2rem;
  `,
};

const variation = {
  primary: css`
    background-color: var(--color-brand-500);
    &:hover {
      background-color: var(--color-brand-600);
    }
  `,
  secondary: css`
    background-color: transparent;
    border: 1px solid var(--color-gray-300);
    color: var(--color-gray-700);
    &:hover {
      background-color: var(--color-gray-50);
    }
  `,
};

export const Button = styled.button`
  color: var(--color-brand-50);
  font-weight: 500;
  border: none;
  border-radius: var(--border-radius-sm);
  font-family: inherit;
  transition: all 0.2s;
  cursor: pointer;

  ${(props) => size[props.$size]}
  ${(props) => variation[props.$variation]}
`;

Button.defaultProps = {
  $size: "medium",
  $variation: "primary",
};
