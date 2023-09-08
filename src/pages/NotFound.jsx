import { styled } from "styled-components";
import Heading from "../components/ui/Heading";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;
`;

const P = styled.p`
  font-size: 2rem;
`;

function NotFound() {
  const naviagte = useNavigate();

  return (
    <Page>
      <Content>
        <Heading>Uh Oh!</Heading>
        <P>It looks like you reached a dead end</P>
        <Button $size="large" onClick={() => naviagte(-1)}>
          Go back
        </Button>
      </Content>
    </Page>
  );
}

export default NotFound;
