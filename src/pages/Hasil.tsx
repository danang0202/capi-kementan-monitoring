import React from 'react';
import TableComponent from '../components/Table';
import ProgressBar from '../components/ProgressBar';
import { Progress as ProgressDataSource } from '../data/Progress';
import { FaArchive, FaCheckCircle, FaWindowClose } from 'react-icons/fa';
import { MdEditDocument, MdReportProblem, MdSend } from 'react-icons/md';

interface ProgressData {
  name: string;
  value: number;
  max: number;
}

interface ProgressItem {
  nomer: number;
  data: ProgressData;
}

const Hasil: React.FC = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'No',
        accessor: 'nomer', // Nomor otomatis
      },
      {
        Header: 'Nama',
        accessor: 'data.name', // Nama dari data
      },
      {
        Header: 'Progress',
        Cell: ({ row }: { row: { original: ProgressItem } }) => {
          const { value, max } = row.original.data;
          return <ProgressBar value={value} max={max} label={true} percentage={true} />;
        },
      },
    ],
    []
  );

  const data: ProgressItem[] = ProgressDataSource.map((item, index) => ({
    nomer: index + 1, // Nomor otomatis
    data: item.data,
  }));

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">Hasil Pencacahan</h1>
      <div className="breadcrumbs text-sm mb-2">
        <ul>
          <li>
            <a href="/">Dashboard</a>
          </li>
          <li>
            <a href="/hasil">Hasil Pencacahan</a>
          </li>
        </ul>
      </div>
      <div className="box-content py-2 grid grid-cols-4 gap-4 ">
        <div className=" shadow-md p-4 py-8 card-compact flex gap-2 items-center bg-white rounded-md ">
          <FaArchive className="text-info text-6xl" />
          <div className="w-3/5 flex justify-center">
            <div className="text-center">
              <h2 className="font-semibold">Total Submissions</h2>
              <p className="text-3xl text-info font-semibold">20</p>
              <p className="">Terkumpul</p>
            </div>
          </div>
        </div>
        <div className="grid grid-flow-row gap-2">
          <div className=" shadow-md p-4 py-4 card-compact flex gap-2 items-center bg-white rounded-md ">
            <MdSend className="text-info text-3xl" />
            <h2 className="">Diterima</h2>
            <p className=" text-info font-semibold badge badge-ghost">14</p>
          </div>
          <div className=" shadow-md p-4 py-4 card-compact flex gap-2 items-center bg-white rounded-md ">
            <MdEditDocument className="text-warning text-3xl" />
            <h2 className="">Diubah</h2>
            <p className=" text-warning font-semibold badge badge-ghost">1</p>
          </div>
        </div>
        <div className="grid grid-flow-row gap-2">
          <div className=" shadow-md p-4 py-4 card-compact flex gap-2 items-center bg-white rounded-md ">
            <MdReportProblem className="text-warning text-3xl" />
            <h2 className="">Bermasalah</h2>
            <p className=" text-warning font-semibold badge badge-ghost">0</p>
          </div>
          <div className=" shadow-md p-4 py-4 card-compact flex gap-2 items-center bg-white rounded-md ">
            <FaWindowClose className="text-error text-3xl" />
            <h2 className="">Ditolak</h2>
            <p className=" text-error font-semibold badge badge-ghost">0</p>
          </div>
        </div>
        <div className=" shadow-md p-4 py-8 card-compact flex gap-2 items-center bg-white rounded-md ">
          <FaCheckCircle className="text-success text-6xl" />
          <div className="w-3/5 flex justify-center">
            <div className="text-center">
              <h2 className="font-semibold">Total Approved</h2>
              <p className="text-3xl text-success font-semibold">14</p>
              <p className="">Approved</p>
            </div>
          </div>
        </div>
      </div>
      <TableComponent<ProgressItem> columns={columns} data={data} />
    </div>
  );
};

export default Hasil;
