import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const Overlay = styled.div`
  background-color: var(--overlay-color);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
`;

const StyledWindow = styled.div`
  background-color: var(--color-gray-0);
  border-radius: var(--border-radius-sm);
  padding: 3.2rem 4.8rem;
  max-height: 95vh;
  overflow: auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
`;

const WindowClose = styled.button`
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-gray-500);
  }

  &:hover {
    background-color: var(--color-gray-100);
  }
`;

const ModalContext = createContext();

function Modal({ children }) {
  const [openId, setOpenId] = useState("");

  function open(id) {
    setOpenId(id);
  }

  function close() {
    setOpenId("");
  }

  return (
    <ModalContext.Provider
      value={{
        openId,
        open,
        close,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

function Open({ id, children }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: () => open(id),
  });
}

function Window({ id, children }) {
  const { openId, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (openId !== id) return null;

  return createPortal(
    <>
      <Overlay />
      <StyledWindow ref={ref}>
        <WindowClose>
          <HiXMark onClick={close} />
        </WindowClose>
        {cloneElement(children, { onCloseModal: close })}
      </StyledWindow>
    </>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
