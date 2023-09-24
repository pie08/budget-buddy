import { cloneElement, createContext, useContext, useState } from "react";
import styled from "styled-components";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const StyledWindow = styled.div`
  padding: 0.8rem 1.2rem;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-gray-0);
  border: 1px solid var(--color-gray-200);
  color: var(--color-gray-500);
  max-width: 40rem;
  text-align: center;
  font-size: 1.4rem;
  z-index: 99;
  box-shadow: 0 0.6rem 2.4rem rgba(0, 0, 0, 0.075);

  position: absolute;
  top: ${(props) => props.$position.y}px;
  left: ${(props) => props.$position.x}px;
  translate: -50% 0;
`;

const toolContext = createContext();

function ToolTip({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState({});

  function close() {
    setOpenId("");
  }

  return (
    <toolContext.Provider
      value={{
        close,
        openId,
        setOpenId,
        position,
        setPosition,
      }}
    >
      {children}
    </toolContext.Provider>
  );
}

function Open({ id, children }) {
  const { setOpenId, openId, close, setPosition } = useContext(toolContext);

  function handleClick(e) {
    e.stopPropagation();
    console.log(e.target.getBoundingClientRect());
    const rect = e.target.getBoundingClientRect();
    setPosition({
      x: rect.x + rect.width / 2,
      y: rect.y + rect.height + 12,
    });

    openId !== id ? setOpenId(id) : close();
  }

  return cloneElement(children, { onClick: handleClick });
}

function Window({ id, children }) {
  const { openId, close, position } = useContext(toolContext);
  const ref = useOutsideClick(close, false);

  if (openId !== id) return null;

  return (
    <StyledWindow $position={position} ref={ref}>
      {children}
    </StyledWindow>
  );
}

ToolTip.Open = Open;
ToolTip.Window = Window;

export default ToolTip;
