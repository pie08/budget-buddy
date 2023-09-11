import styled, { css } from "styled-components";

const Form = styled.form`
  background-color: var(--color-gray-0);
  border-radius: var(--border-radius-sm);
  overflow: hidden;
  font-size: 1.4rem;

  padding: 3.2rem 4.8rem;
  border: 1px solid var(--color-gray-100);

  ${(props) =>
    props.$type === "modal" &&
    css`
      border: none;
      padding: 0;
      width: clamp(30rem, 80rem, 85vw);
    `}
`;

export default Form;
