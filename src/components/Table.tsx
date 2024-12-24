import React, { useMemo, useState } from 'react';
import { useTable, usePagination, useGlobalFilter, useFilters, useSortBy, Column } from 'react-table';
import { FaSortUp, FaSortDown, FaSort } from 'react-icons/fa';

// Komponen untuk input pencarian dengan rekomendasi
const GlobalFilterWithSuggestions = ({ globalFilter, setGlobalFilter, suggestions, setInputValue }: { globalFilter: string; setGlobalFilter: (filter: string) => void; suggestions: string[]; setInputValue: (value: string) => void }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  return (
    <div className="relative w-10/12">
      <input
        value={globalFilter || ''}
        onChange={(e) => {
          setGlobalFilter(e.target.value);
          setInputValue(e.target.value);
          setShowSuggestions(true);
        }}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        placeholder="Cari data..."
        className="input input-bordered w-full mb-4"
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute bg-white border rounded-md shadow-md w-full z-10">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => {
                setGlobalFilter(suggestion);
                setInputValue(suggestion);
                setShowSuggestions(false);
              }}
              className="p-2 hover:bg-gray-200 cursor-pointer"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

interface TableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
}

const TableComponent = <T extends object>({ columns, data }: TableProps<T>) => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, page, canPreviousPage, canNextPage, pageOptions, pageCount, gotoPage, nextPage, previousPage, setGlobalFilter, state, setPageSize } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: rowsPerPage },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex } = state;

  // Membuat rekomendasi berdasarkan input
  const updateSuggestions = (value: string) => {
    if (!value) {
      setSuggestions([]);
      return;
    }
    const allValues = data.flatMap((row: any) => Object.values(row));
    const filteredSuggestions = Array.from(new Set(allValues.filter((item) => item.toString().toLowerCase().includes(value.toLowerCase()))));
    setSuggestions(filteredSuggestions);
  };

  return (
    <div className="overflow-x-auto overflow-y-auto">
      {/* Input Pencarian */}
      <div className="flex justify-between">
        <GlobalFilterWithSuggestions
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          suggestions={suggestions}
          setInputValue={(value) => {
            setInputValue(value);
            updateSuggestions(value);
          }}
        />
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
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span className="">{column.isSorted ? column.isSortedDesc ? <FaSortDown className="inline-block" /> : <FaSortUp className="inline-block" /> : <FaSort className="inline-block" />}</span>
                </th>
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
      <div className="xs:flex max-md:space-y-2 mx-auto block justify-between items-center mt-4">
        <div>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="bg-primary rounded-md md:py-2 md:px-3 py-1 px-2 text-base text-white hover:brightness-90 font-semibold mx-1">
            {'<<'}
          </button>
          <button onClick={() => previousPage()} disabled={!canPreviousPage} className="bg-primary rounded-md md:py-2 md:px-3 py-1 px-2 text-base text-white hover:brightness-90 font-semibold mx-1">
            {'<'}
          </button>
          <button onClick={() => nextPage()} disabled={!canNextPage} className="bg-primary rounded-md md:py-2 md:px-3 py-1 px-2 text-base text-white hover:brightness-90 font-semibold mx-1">
            {'>'}
          </button>
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="bg-primary rounded-md md:py-2 md:px-3 py-1 px-2 text-base text-white hover:brightness-90 font-semibold mx-1">
            {'>>'}
          </button>
        </div>
        <div className="text-end">
          Halaman{' '}
          <strong>
            {pageIndex + 1} dari {pageOptions.length}
          </strong>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
