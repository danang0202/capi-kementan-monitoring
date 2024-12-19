import React, { useMemo, useState } from 'react';
import { useTable, usePagination, useGlobalFilter, useFilters, Column } from 'react-table';

// Komponen untuk input pencarian
const GlobalFilter = ({ globalFilter, setGlobalFilter }: { globalFilter: string; setGlobalFilter: (filter: string) => void }) => (
  <input value={globalFilter || ''} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Cari data..." className="input input-bordered mb-4 w-10/12 " />
);

interface TableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
}

const TableComponent = <T extends object>({ columns, data }: TableProps<T>) => {
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, page, canPreviousPage, canNextPage, pageOptions, pageCount, gotoPage, nextPage, previousPage, setGlobalFilter, state, setPageSize } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: rowsPerPage },
    },
    useFilters,
    useGlobalFilter,
    usePagination
  );

  const { globalFilter, pageIndex } = state;

  return (
    <div className="overflow-x-auto">
      {/* Input Pencarian */}
      <div className="flex justify-between">
        <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
        <select
          className="select select-bordered"
          value={rowsPerPage}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setRowsPerPage(Number(e.target.value));
          }}
        >
          {[5, 10, 20].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Tampilkan {pageSize}
            </option>
          ))}
        </select>
      </div>

      {/* Tabel */}
      <table {...getTableProps()} className="table table-zebra w-full  rounded-md shadow-md">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Kontrol Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="bg-primary rounded-md py-2 px-3 text-white hover:brightness-90 font-semibold mx-1">
            {'<<'}
          </button>
          <button onClick={() => previousPage()} disabled={!canPreviousPage} className="bg-primary rounded-md py-2 px-3 text-white hover:brightness-90 font-semibold mx-1">
            {'<'}
          </button>
          <button onClick={() => nextPage()} disabled={!canNextPage} className="bg-primary rounded-md py-2 px-3 text-white hover:brightness-90 font-semibold mx-1">
            {'>'}
          </button>
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="bg-primary rounded-md py-2 px-3 text-white hover:brightness-90 font-semibold mx-1">
            {'>>'}
          </button>
        </div>
        <span>
          Halaman{' '}
          <strong>
            {pageIndex + 1} dari {pageOptions.length}
          </strong>
        </span>
      </div>
    </div>
  );
};

export default TableComponent;
