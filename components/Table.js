import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import React from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

// Define a default UI for filtering
export function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  return (
    <input
      className="w-20 text-center"
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`All`}
    />
  );
}

// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two
export function NumberRangeColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <div className="flex w-25">
      <input
        className="w-8 mr-1 text-center"
        value={filterValue[0] || ""}
        inputMode="numeric"
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [
            val ? parseInt(val, 10) : undefined,
            old[1],
          ]);
        }}
        placeholder={`Min`}
      />
      <span>to</span>
      <input
        className="w-8 ml-1 text-center"
        value={filterValue[1] || ""}
        inputMode="numeric"
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [
            old[0],
            val ? parseInt(val, 10) : undefined,
          ]);
        }}
        placeholder={`Max`}
      />
    </div>
  );
}

export default function Table({ columns, data }) {
  const filterTypes = React.useMemo(
    () => ({
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  // Render the UI for your table
  return (
    <div>
      <div className="overflow-x-auto">
        <table
          className="table-auto min-w-max mx-auto my-1"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup, rowidx) => (
              <tr key={rowidx} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, colidx) => (
                  <th
                    key={colidx}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    <div className="flex justify-center space-x-1 items-center">
                      <span>{column.render("Header")}</span>
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="18"
                              height="18"
                            >
                              <path fill="none" d="M0 0H24V24H0z" />
                              <path d="M20 4v12h3l-4 5-4-5h3V4h2zm-8 14v2H3v-2h9zm2-7v2H3v-2h11zm0-7v2H3V4h11z" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="18"
                              height="18"
                            >
                              <path fill="none" d="M0 0H24V24H0z" />
                              <path d="M19 3l4 5h-3v12h-2V8h-3l4-5zm-5 15v2H3v-2h11zm0-7v2H3v-2h11zm-2-7v2H3V4h9z" />
                            </svg>
                          )
                        ) : (
                          ""
                        )}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
            {headerGroups.map((headerGroup, rowidx) => (
              <tr key={rowidx} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, colidx) => (
                  <th key={colidx}>
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, ridx) => {
              prepareRow(row);
              return (
                <tr key={ridx} {...row.getRowProps()}>
                  {row.cells.map((cell, cidx) => {
                    return (
                      <td
                        className="text-center px-2 py-1"
                        key={cidx}
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination mt-4 flex justify-center space-x-4">
        <div className="flex items-center space-x-2">
          <button
            className="text-gray-700 font-bold pl-2 pr-2 bg-green-200 transition-colors ease-in-out hover:bg-green-400 rounded"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <GrFormPrevious />
          </button>
          <span>
            Page
            <strong>
              {" "}
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
          <button
            className="text-gray-700 font-bold pl-2 pr-2 bg-green-200 transition-colors ease-in-out hover:bg-green-400 rounded"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <GrFormNext />
          </button>
        </div>
        <div className="space-x-2">
          <span>Show:</span>
          <select
            className="form-select border-2 border-green-300 bg-white"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
