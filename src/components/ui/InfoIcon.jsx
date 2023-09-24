import { HiOutlineInformationCircle } from "react-icons/hi2";
import styled, { keyframes } from "styled-components";

const hover = keyframes`
  from {
    translate: 0 0;
  }

  to {
    translate: 0 -0.4rem;
  }
`;

const InfoIcon = styled(HiOutlineInformationCircle)`
  width: 2rem;
  height: 2rem;
  color: var(--color-gray-400);
  cursor: pointer;

  &:hover {
    animation: ${hover} 0.8s ease-in-out infinite alternate;
  }
`;

export default InfoIcon;
