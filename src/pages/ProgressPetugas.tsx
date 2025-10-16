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
}

const ProgressPetugas: React.FC = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'No',
        accessor: 'nomer', // Nomor otomatis
      },
      {
        Header: 'Nama',
        accessor: 'name', // Nama dari data
      },
      {
        Header: 'Progress',
        Cell: ({ row }: { row: { original: ProgressItem } }) => {
          const { value, max } = row.original;
          return <ProgressBar value={value} max={max} label={true} percentage={true} />;
        },
      },
    ],
    []
  );

  const data: ProgressItem[] = ProgressDataSource.map((item, index) => ({
    nomer: index + 1, // Nomor otomatis
    ...item,
  }));

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-2">Progress Petugas</h1>
      <div className="breadcrumbs text-sm mb-2">
        <ul>
          <li>
            <a href="/">Dashboard</a>
          </li>
          <li>
            <a href="/progress_petugas">Progress Petugas</a>
          </li>
        </ul>
      </div>
      <div className="p-4 space-y-2 rounded-md bg-white shadow-md my-2">
        <h1 className="font-semibold text-xl ">Progress Keseluruhan </h1>
        <hr className="w-full border-t-[1.7px] border-slate-300" />
        <ProgressBar max={100} value={35} label={true} percentage={true} />
      </div>
      <TableComponent<ProgressItem> columns={columns} data={data} />
    </div>
  );
};

export default ProgressPetugas;
