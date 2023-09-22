import styled, { css, keyframes } from "styled-components";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;
  width: 40rem;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.p`
  color: var(--color-red-700);
  font-weight: 500;
`;

function FormRowVertical({ children, label, error, type }) {
  return (
    <StyledFormRow $type={type}>
      {label && <Label htmlFor={children?.props?.id || null}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRowVertical;
