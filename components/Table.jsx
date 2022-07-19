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
            {headerGroups.map((headerGroups, i) => (
              <Tr
                key={i}
                {...headerGroups.getHeaderGroupProps()}
                backgroundColor={"purple.800"}
              >
                {headerGroups.headers.map((column, id) => (
                  <Th
                    key={id}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    textTransform={"capitalize"}
                    textColor={"white"}
                    isNumeric={column.isNumeric}
                    className="truncate text-center"
                    textAlign="center"
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
            {rows.map((row, id) => {
              prepareRow(row);
              return (
                <Tr key={id} {...row.getRowProps()}>
                  {row.cells.map((cell, id) => (
                    <Td
                      key={id}
                      {...cell.getCellProps()}
                      maxWidth="300px"
                      className="truncate text-center"
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
