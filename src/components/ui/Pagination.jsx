import styled from "styled-components";
import { Button } from "./Button";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
const pageSize = import.meta.env.VITE_NUM_PER_PAGE;

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.4rem;
`;

const Pages = styled.div`
  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 2.4rem;
`;

const StyledButton = styled.button`
  padding: 0.6rem 1rem;
  font-weight: 500;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  border-radius: var(--border-radius-sm);

  & svg {
    width: 1.8rem;
    height: 1.8rem;
  }

  &:hover {
    background-color: var(--color-brand-500);
    color: var(--color-gray-0);
  }
`;

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const numPages = Math.ceil(count / pageSize);

  function next() {
    const nextPage =
      currentPage + 1 <= numPages ? currentPage + 1 : currentPage;

    searchParams.set("page", nextPage);
    setSearchParams(searchParams);
  }

  function previous() {
    const prevPage = currentPage - 1 >= 1 ? currentPage - 1 : 1;

    searchParams.set("page", prevPage);
    setSearchParams(searchParams);
  }

  return (
    <StyledPagination>
      <Pages>
        Page <span>{currentPage}</span> of <span>{numPages}</span>
      </Pages>

      <Buttons>
        <StyledButton onClick={previous} disabled={currentPage === 1}>
          <HiChevronLeft /> Previous
        </StyledButton>
        <StyledButton onClick={next} disabled={currentPage === numPages}>
          Next
          <HiChevronRight />
        </StyledButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
