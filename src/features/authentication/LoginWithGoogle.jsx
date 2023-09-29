import styled from "styled-components";
import { IoLogoGoogle } from "react-icons/io";
import { useLoginWithGoogle } from "./useLoginWithGoogle";

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  padding: 1.2rem 1.6rem;
  font-size: 1.6rem;

  background-color: var(--color-gray-300);
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-gray-400);
    color: var(--color-gray-50);
  }
`;

function LoginWithGoogle() {
  const { loginWithGoogle, isLoading } = useLoginWithGoogle();

  function handleClick(e) {
    e.preventDefault();
    loginWithGoogle();
  }

  return (
    <Button onClick={handleClick} disabled={isLoading}>
      <IoLogoGoogle />
      Login with Google
    </Button>
  );
}

export default LoginWithGoogle;
