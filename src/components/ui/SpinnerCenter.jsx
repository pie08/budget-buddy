import styled from "styled-components";
import Spinner from "./Spinner";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function SpinnerCenter() {
  return (
    <Container>
      <Spinner />
    </Container>
  );
}

export default SpinnerCenter;
