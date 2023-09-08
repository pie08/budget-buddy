import { createContext, useContext, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledButton = styled.button`
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-gray-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-gray-700);
  }
`;

const StyledList = styled.ul`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  position: absolute;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-gray-0);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);

  top: ${(props) => props.$position.y}px;
  right: ${(props) => props.$position.x}px;
`;

const StyledItem = styled.button`
  width: 100%;
  font-size: 1.4rem;
  padding: 1.2rem 2.4rem;
  color: var(--color-gray-700);
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  & svg {
    color: var(--color-gray-400);
    width: 1.6rem;
    height: 1.6rem;
  }

  &:hover {
    background-color: var(--color-gray-50);
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  function open(id) {
    setOpenId(id);
  }

  function close() {
    setOpenId("");
  }

  return (
    <MenusContext.Provider
      value={{
        openId,
        setOpenId,
        position,
        setPosition,
        open,
        close,
      }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Open({ id }) {
  const { open, close, openId, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === id ? close() : open(id);
  }

  return (
    <StyledButton onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledButton>
  );
}

function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick(close, false);

  if (openId !== id) return null;

  return createPortal(
    <StyledList $position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

function Item({ children, onClick, icon, disabled }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <StyledItem onClick={handleClick} disabled={disabled}>
      {icon}
      <span>{children}</span>
    </StyledItem>
  );
}

Menus.Open = Open;
Menus.Menu = Menu;
Menus.List = List;
Menus.Item = Item;

export default Menus;
