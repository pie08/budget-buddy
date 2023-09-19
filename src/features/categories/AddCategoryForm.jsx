import styled from "styled-components";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addCustomCategory } from "./addCustomCategory";
import { useCategory } from "../../context/CategoryContext";

const CardForm = styled.div`
  display: inline-block;
  background-color: var(--color-gray-0);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--border-radius-sm);
  padding: 1.2rem 1.6rem;

  grid-column: span 2;
  display: flex;
  align-items: center;
  gap: 2.4rem;
`;

const Heading = styled.h3`
  font-size: 1.4rem;
  font-weight: 500;
`;

const Form = styled.form`
  position: relative;
  flex-grow: 1;
`;

const Input = styled.input`
  border: 1px solid var(--color-gray-200);
  border-radius: var(--border-radius-sm);
  font-size: 1.4rem;
  width: 100%;
  padding: 0.4rem 0.6rem;
`;

const Error = styled.p`
  position: absolute;
  bottom: -2rem;
  left: 0;
  color: var(--color-red-700);
  font-size: 1.2rem;
`;

function AddCategoryForm({ onClose }) {
  const { localStorageKey } = useCategory();
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");

  const ref = useOutsideClick(onClose, false);

  useEffect(
    function () {
      if (categoryName.split(" ").length > 1)
        setError("Category name cannot include spaces");
      else if (categoryName.length > 20) setError("Category name too long");
      else setError("");
    },
    [categoryName]
  );

  // todo: prevent dupilcate categories
  function handleSubmit(e) {
    e.preventDefault();
    if (error) return;

    addCustomCategory(localStorageKey, categoryName.toLowerCase());
    toast.success("Category successfully created");
    onClose();
  }

  return (
    <CardForm ref={ref}>
      <Heading>Category name</Heading>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        {error && <Error>{error}</Error>}
      </Form>
    </CardForm>
  );
}

export default AddCategoryForm;
