import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const Select = styled.select`
  padding: 0.8rem 1.2rem;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-gray-0);
  border: 1px solid var(--color-gray-200);
  font-size: 1.4rem;
`;

function ParamSelect({ options, fieldName }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(fieldName) || "";

  function handleChange(e) {
    searchParams.set(fieldName, e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select value={query} onChange={handleChange}>
      {options.map((opt, i) => (
        <option value={opt.value} key={i}>
          {opt.label}
        </option>
      ))}
    </Select>
  );
}

export default ParamSelect;
