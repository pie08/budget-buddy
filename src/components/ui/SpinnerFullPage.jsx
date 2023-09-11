import styled from "styled-components";
import Spinner from "./Spinner";

const Center = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function SpinnerFullPage() {
  return (
    <Center>
      <Spinner />
    </Center>
  );
}

export default SpinnerFullPage;
