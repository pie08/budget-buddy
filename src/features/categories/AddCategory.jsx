import styled from "styled-components";
import { HiOutlinePlusCircle } from "react-icons/hi2";
import { useState } from "react";
import AddCategoryForm from "./AddCategoryForm";

const CardBtn = styled.div`
  display: inline-block;
  background-color: var(--color-gray-0);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--border-radius-sm);
  padding: 1.2rem 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  cursor: pointer;

  & svg {
    color: var(--color-gray-200);
    width: 4.8rem;
    height: 4.8rem;
    transition: all 0.2s;
  }

  &:hover {
    border: 1px solid var(--color-gray-300);
  }

  &:hover svg {
    color: var(--color-gray-300);
  }
`;

const Rotate = styled.span`
  transform: rotate(45deg);
  line-height: 0;
`;

function AddCategory() {
  const [isOpenForm, setIsOpenForm] = useState(false);

  function handleClose() {
    setIsOpenForm(false);
  }

  function handleClick(e) {
    e.stopPropagation();
    setIsOpenForm((open) => !open);
  }

  return (
    <>
      {isOpenForm && <AddCategoryForm onClose={handleClose} />}

      <CardBtn onClick={handleClick}>
        {isOpenForm ? (
          <Rotate>
            <HiOutlinePlusCircle />
          </Rotate>
        ) : (
          <HiOutlinePlusCircle />
        )}
      </CardBtn>
    </>
  );
}

export default AddCategory;
