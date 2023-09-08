import { createContext, useContext } from "react";
import { styled } from "styled-components";

const StyledTable = styled.div`
  background-color: var(--color-gray-0);
  border-radius: var(--border-radius-sm);
  overflow: hidden;
  border: 1px solid var(--color-gray-200);
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
  padding: 1.8rem 2.4rem;
  align-items: center;
  column-gap: 2rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-gray-100);
  }
`;

const TableHeader = styled(CommonRow)`
  font-weight: 500;
  background-color: var(--color-gray-100);
`;

const TableRow = styled(CommonRow)`
  font-size: 1.4rem;
  background-color: var(--color-gray-0);
`;

const TableContext = createContext();

function Table({ children, columns }) {
  return (
    <TableContext.Provider
      value={{
        columns,
      }}
    >
      <StyledTable>{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);

  return <TableHeader $columns={columns}>{children}</TableHeader>;
}

function Row({ children }) {
  const { columns } = useContext(TableContext);

  return <TableRow $columns={columns}>{children}</TableRow>;
}

function Body({ data, render }) {
  return data.map(render);
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;

export default Table;
