import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  SkeletonText,
} from "@chakra-ui/react";
import { FaSort } from "react-icons/fa";
import { useSortBy, useTable } from "react-table";

function NewTable({ columns, data, isLoading }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data, manualPagination: true }, useSortBy);

  const arrayKosong = [...new Array(10)];

  return (
    <div>
      <TableContainer
        rounded={"lg"}
        className="scrollbar-thin scroll scrollbar-thumb-violet-900 scrollbar-track-slate-300 overflow-y-scroll 
          scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
      >
        <Table {...getTableProps()} variant="striped" colorScheme="purple">
          <Thead>
            {headerGroups.map((headerGroups) => (
              <Tr
                {...headerGroups.getHeaderGroupProps()}
                backgroundColor={"purple.800"}
              >
                {headerGroups.headers.map((column) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    textTransform={"capitalize"}
                    textColor={"white"}
                    isNumeric={column.isNumeric}
                    className="truncate"
                  >
                    {" "}
                    <div className="flex jus">
                      {column.render("Header")}
                      <FaSort />
                    </div>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <Td
                      {...cell.getCellProps()}
                      maxWidth="200px"
                      className="truncate"
                      isNumeric={cell.column.isNumeric}
                    >
                      {!isLoading ? (
                        <>{cell.render("Cell")}</>
                      ) : (
                        <SkeletonText noOfLines={1} mt={2} mb={1} />
                      )}
                    </Td>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default NewTable;
