import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  grid-template-columns: 24rem 1fr 1fr;
  gap: 2.4rem;
  align-items: center;
  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-gray-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.p`
  color: var(--color-red-700);
  font-weight: 500;
`;

function FormRow({ children, label, error }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children?.props?.id || null}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
