import { useState } from 'react';
import { useTable, usePagination, useGlobalFilter, useFilters, useSortBy, Column } from 'react-table';
import { FaSortUp, FaSortDown, FaSort } from 'react-icons/fa';

// Komponen input dengan suggestions
const GlobalFilterWithSuggestions = ({ globalFilter, setGlobalFilter, suggestions, setInputValue }: { globalFilter: string; setGlobalFilter: (filter: string) => void; suggestions: string[]; setInputValue: (value: string) => void }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  return (
    <div className="relative w-full">
      <input
        value={globalFilter || ''}
        onChange={(e) => {
          setGlobalFilter(e.target.value);
          setInputValue(e.target.value);
          setShowSuggestions(true);
        }}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        placeholder="Cari data..."
        className="input input-bordered w-full mb-3 border-gray-300 bg-white text-gray-700 placeholder-gray-400 text-sm shadow-sm focus:ring-1 focus:ring-primary focus:border-primary transition"
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute bg-white border border-gray-200 rounded-md shadow-md w-full z-10 max-h-52 overflow-y-auto text-sm">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => {
                setGlobalFilter(suggestion);
                setInputValue(suggestion);
                setShowSuggestions(false);
              }}
              className="p-2 hover:bg-primary/10 cursor-pointer transition"
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

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page, canPreviousPage, canNextPage, pageOptions, pageCount, gotoPage, nextPage, previousPage, setGlobalFilter, state, setPageSize } = useTable(
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
    <div className="overflow-x-auto w-full bg-white rounded-md shadow-md p-3">
      {/* Input Pencarian */}
      <div className="md:flex justify-between max-md:space-y-2 w-full mb-3">
        <div className="flex flex-1 w-full">
          <GlobalFilterWithSuggestions
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            suggestions={suggestions}
            setInputValue={(value) => {
              setInputValue(value);
              updateSuggestions(value);
            }}
          />
        </div>
        <div className="flex flex-wrap max-xs:space-y-2">
          <select
            className="select select-bordered border-gray-300 bg-white text-gray-700 shadow-sm text-sm focus:ring-1 focus:ring-primary focus:border-primary transition"
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
      </div>

      {/* Tabel */}
      <table {...getTableProps()} className="table-auto w-full border-collapse rounded-md shadow-sm text-sm">
        <thead className="bg-gray-50">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} className="px-3 py-2 text-left text-gray-700 font-medium border-b border-gray-200 bg-gray-100 rounded-sm select-none">
                  <div className="flex items-center gap-1">
                    {column.render('Header')}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <FaSortDown className="inline-block text-gray-500 text-xs" />
                      ) : (
                        <FaSortUp className="inline-block text-gray-500 text-xs" />
                      )
                    ) : (
                      <FaSort className="inline-block text-gray-300 text-xs" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="divide-y divide-gray-200">
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="hover:bg-gray-50 transition">
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="px-3 py-2 text-gray-700 text-sm text-start">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex flex-col xs:flex-row max-md:space-y-2 justify-between items-center mt-3 text-sm">
        <div className="flex gap-1">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="bg-primary text-white rounded-md px-3 py-2 hover:brightness-90 transition disabled:opacity-50">
            {'<<'}
          </button>
          <button onClick={() => previousPage()} disabled={!canPreviousPage} className="bg-primary text-white rounded-md px-3 py-2 hover:brightness-90 transition disabled:opacity-50">
            {'<'}
          </button>
          <button onClick={() => nextPage()} disabled={!canNextPage} className="bg-primary text-white rounded-md px-3 py-2 hover:brightness-90 transition disabled:opacity-50">
            {'>'}
          </button>
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="bg-primary text-white rounded-md px-3 py-2 hover:brightness-90 transition disabled:opacity-50">
            {'>>'}
          </button>
        </div>
        <div className="text-gray-700 mt-1 xs:mt-0">
          Halaman <strong>{pageIndex + 1}</strong> dari <strong>{pageOptions.length}</strong>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
