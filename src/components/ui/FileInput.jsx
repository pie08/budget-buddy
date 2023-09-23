import styled from "styled-components";

const FileInput = styled.input.attrs({ type: "file" })`
  &::file-selector-button {
    border: none;
    background-color: var(--color-brand-500);
    font-family: inherit;
    font-size: 1.6rem;
    font-weight: 500;
    border-radius: var(--border-radius-sm);
    color: var(--color-brand-50);
    padding: 0.6rem 1rem;
    margin-right: 1.2rem;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: var(--color-brand-600);
    }
  }
`;

export default FileInput;
