import { BiLoaderAlt } from "react-icons/bi";
import styled, { keyframes } from "styled-components";

const Spin = keyframes`
  from {
    rotate: 0deg;
  }

  to {
    rotate: 360deg;
  }
`;

const SpinnerMini = styled(BiLoaderAlt)`
  width: 2.4rem;
  height: 2.4rem;
  animation: ${Spin} 1s infinite linear;
`;

export default SpinnerMini;
