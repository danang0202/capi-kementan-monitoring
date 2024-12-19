import React, { useState } from 'react';
import TableComponent from '../components/Table';
import { FaArchive, FaArrowRight, FaCheckCircle, FaEye, FaWindowClose } from 'react-icons/fa';
import { MdEditDocument, MdReportProblem, MdSend } from 'react-icons/md';
import { GetTanggalIndonesia } from '../utils/getTanggalIndonesia';
import { LuRefreshCcw } from 'react-icons/lu';

interface SubmissionData {
  id: number;
  timestamp: string;
  submitter: string;
  labelRumahTangga: string;
  status: string;
}

const Hasil: React.FC = () => {
  // Data awal
  const [data, setData] = useState<SubmissionData[]>([
    {
      id: 1,
      timestamp: '3 Mar 2024, 06:15:51',

      submitter: 'IRSYAD FADHIL ASYRAF',
      labelRumahTangga: 'PEMECUTAN_KLOD.064B.33',
      status: 'Ditolak',
    },
    {
      id: 2,
      timestamp: '3 Mar 2024, 01:22:35',

      submitter: 'IRSYAD FADHIL ASYRAF',
      labelRumahTangga: 'KARANGASEM.002B.14',
      status: 'Diterima',
    },
    {
      id: 3,
      timestamp: '3 Mar 2024, 01:22:35',

      submitter: 'IRSYAD FADHIL ASYRAF',
      labelRumahTangga: 'KARANGASEM.002B.14',
      status: 'Diterima',
    },
    {
      id: 4,
      timestamp: '3 Mar 2024, 01:22:35',

      submitter: 'IRSYAD FADHIL ASYRAF',
      labelRumahTangga: 'KARANGASEM.002B.14',
      status: 'Diterima',
    },
  ]);

  // Fungsi untuk mendapatkan kelas warna berdasarkan status
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Diterima':
        return 'btn-info';
      case 'Bermasalah':
      case 'Diubah':
        return 'btn-warning';
      case 'Ditolak':
        return 'btn-error';
      case 'Diapprove':
        return 'btn-success text-white';
      default:
        return 'btn-ghost';
    }
  };

  // Fungsi untuk mengubah status
  const handleStatusChange = (id: number, newStatus: string) => {
    const updatedData = data.map((item) => (item.id === id ? { ...item, status: newStatus } : item));
    setData(updatedData);
  };

  // Definisi kolom untuk `react-table`
  const columns: Column<SubmissionData>[] = [
    {
      Header: 'Timestamp',
      accessor: 'timestamp',
    },

    {
      Header: 'Submitter',
      accessor: 'submitter',
    },
    {
      Header: 'Label Rumah Tangga',
      accessor: 'labelRumahTangga',
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ row }: any) => {
        const { id, status } = row.original;
        return (
          <div className={`dropdown dropdown-hover ${id === 1 ? 'dropdown-end' : 'dropdown-top'}`}>
            <label tabIndex={0} className={`btn ${getStatusClass(status)} btn-sm`}>
              {status}
            </label>
            <ul tabIndex={0} className="dropdown-content z-10 menu p-2 shadow bg-base-100 rounded-box w-52  overflow-y-auto">
              {['Diterima', 'Bermasalah', 'Diubah', 'Ditolak', 'Diapprove'].map((newStatus) => (
                <li key={newStatus}>
                  <button className="btn btn-ghost btn-sm" onClick={() => handleStatusChange(id, newStatus)}>
                    {newStatus}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      },
    },
    {
      Header: 'Aksi',
      accessor: 'id',
      Cell: ({ row }: any) => {
        return (
          <button className="btn btn-sm font-semibold btn-info">
            Lihat
            <FaEye className="text-lg" />
          </button>
        );
      },
    },
  ];

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

      <div className="flex justify-between items-center my-2 ">
        <h1 className="text-info font-semibold text-2xl">Submission Terbaru</h1>
        <p>
          <span className="text-primary font-semibold">Last Update</span>
          &nbsp; &nbsp;
          {`${GetTanggalIndonesia()}  pukul ${new Date().toLocaleTimeString()}`}
        </p>
        <div className="space-x-4">
          <button className="btn btn-accent ">
            Refresh <LuRefreshCcw className="text-xl" />
          </button>
          <button className="btn btn-info ">
            Selengkapnya <FaArrowRight className="text-xl" />
          </button>
        </div>
      </div>

      <hr className="w-full border-t-[1.7px] border-slate-300 mb-4" />

      <TableComponent<SubmissionData> columns={columns} data={data} />
    </div>
  );
};

export default Hasil;
