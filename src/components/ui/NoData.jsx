import { styled } from "styled-components";

const StyledNoData = styled.div`
  margin: 0 auto;
  padding: 1.2rem 2.4rem;
  background-color: var(--color-gray-200);
  border-radius: var(--border-radius-md);
  font-size: 1.8rem;
  font-weight: 500;
`;

function NoData({ resource }) {
  return <StyledNoData>No {resource} were found</StyledNoData>;
}

export default NoData;
