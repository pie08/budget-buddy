import styled from "styled-components";
import Heading from "./Heading";
import { Button } from "./Button";
import GlobalStyles from "../../styles/GlobalStyles";

const StyledErrorFallback = styled.div`
  height: 100vh;
  background-color: var(--color-gray-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  background-color: var(--color-gray-0);
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-gray-200);

  padding: 4.8rem;
  text-align: center;

  & h1 {
    margin-bottom: 1.6rem;
  }

  & p {
    font-family: "Sono";
    margin-bottom: 3.2rem;
    color: var(--color-gray-500);
  }
`;

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <>
      <GlobalStyles />
      <StyledErrorFallback>
        <Box>
          <Heading>An error has occured</Heading>
          <p>{error.message}</p>
          <Button onClick={resetErrorBoundary}>Try again</Button>
        </Box>
      </StyledErrorFallback>
    </>
  );
}

export default ErrorFallback;
