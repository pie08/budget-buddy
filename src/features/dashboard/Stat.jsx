import styled from "styled-components";
import ToolTip from "../../components/ui/ToolTip";
import InfoIcon from "../../components/ui/InfoIcon";

const StyledStat = styled.div`
  display: grid;
  grid-template-columns: 6.4rem 1fr;
  grid-template-rows: auto auto;
  column-gap: 1.6rem;
  padding: 1.6rem;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-gray-0);
  border: 1px solid var(--color-gray-200);

  position: relative;
`;

const Icon = styled.div`
  grid-row: 1 / -1;
  aspect-ratio: 1 / 1;
  border-radius: 999rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => `var(--color-${props.$color}-100)`};

  & svg {
    width: 3.2rem;
    height: 3.2rem;
    color: ${(props) => `var(--color-${props.$color}-700)`};
  }
`;

const Title = styled.p`
  color: var(--color-gray-500);
  font-size: 1.4rem;
  font-weight: 500;
  align-self: end;
  text-transform: capitalize;
`;

const Amount = styled.p`
  font-size: 2.4rem;
  font-weight: 500;
  align-self: start;
`;

const StyledToolTip = styled.div`
  position: absolute;
  top: 1.6rem;
  right: 1.6rem;
`;

function Stat({ title, amount, icon, color, toolTip = false }) {
  return (
    <StyledStat>
      <Icon $color={color}>{icon}</Icon>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>

      {toolTip && (
        <>
          <StyledToolTip>
            <ToolTip.Open id={title}>
              <InfoIcon />
            </ToolTip.Open>
          </StyledToolTip>

          <ToolTip.Window id={title}>
            <p>{toolTip}</p>
          </ToolTip.Window>
        </>
      )}
    </StyledStat>
  );
}

export default Stat;
