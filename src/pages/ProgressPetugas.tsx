import React from 'react';
import TableComponent from '../components/Table';
import ProgressBar from '../components/ProgressBar';
import { Progress as ProgressDataSource } from '../data/progress';

interface ProgressData {
  name: string;
  value: number;
  max: number;
}

interface ProgressItem {
  nomer: number;
  data: ProgressData;
  name: string;
  value: number;
  max: number;
}

const ProgressPetugas: React.FC = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'No',
        accessor: 'nomer',
        Cell: ({ value }: { value: number }) => <div className="text-center">{value}</div>,
      },
      {
        Header: 'Nama Petugas',
        accessor: 'name',
        Cell: ({ value }: { value: string }) => <span className="font-medium text-gray-700">{value}</span>,
      },
      {
        Header: 'Progress',
        Cell: ({ row }: { row: { original: ProgressItem } }) => {
          const { value, max } = row.original;
          return (
            <div className="w-full">
              <ProgressBar value={value} max={max} label={true} percentage={true} />
            </div>
          );
        },
      },
    ],
    []
  );

  const data: ProgressItem[] = ProgressDataSource.map((item, index) => ({
    nomer: index + 1,
    ...item,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Progress Petugas</h1>
        <div className="text-sm breadcrumbs mt-2">
          <ul className="text-gray-500">
            <li>
              <a href="/" className="hover:text-gray-700">
                Dashboard
              </a>
            </li>
            <li className="text-gray-700 font-medium">Progress Petugas</li>
          </ul>
        </div>
      </div>

      {/* Card Progress Keseluruhan */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Progress Keseluruhan</h2>
          <span className="text-sm text-gray-500">35 dari 100 selesai</span>
        </div>
        <ProgressBar max={100} value={35} label={true} percentage={true} />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <TableComponent<ProgressItem> columns={columns} data={data} />
      </div>
    </div>
  );
};

export default ProgressPetugas;
