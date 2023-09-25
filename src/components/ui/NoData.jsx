import { styled } from "styled-components";
import Heading from "./Heading";

const StyledNoData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  align-items: center;
  padding: 0 2.4rem;
`;

const Image = styled.img`
  max-width: 25rem;
`;

function NoData({ resource }) {
  return (
    <StyledNoData>
      <Image src="no-data.svg" />
      <Heading as="h3">No {resource} found</Heading>
    </StyledNoData>
  );
}

export default NoData;
