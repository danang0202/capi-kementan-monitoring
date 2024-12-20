import React, { useState } from 'react';
import TableComponent from '../components/Table';
import { FaArrowRight, FaEye } from 'react-icons/fa';
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
          <button className="btn lg:btn-sm btn-md font-semibold btn-info ">
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

      <div className="block max-md:space-y-2 md:flex justify-between items-center my-2 ">
        <h1 className="text-info font-semibold text-2xl">Submission Terbaru</h1>
        <p>
          <span className="text-primary font-semibold">Last Update</span>
          &nbsp; &nbsp;
          {`${GetTanggalIndonesia()}  pukul ${new Date().toLocaleTimeString()}`}
        </p>
        <div className="space-x-4">
          <button className="btn btn-accent md:text-base text-xs">
            Refresh <LuRefreshCcw className="md:text-xl text-base" />
          </button>
          <button className="btn btn-info md:text-base text-xs">
            Selengkapnya <FaArrowRight className="md:text-xl text-base" />
          </button>
        </div>
      </div>

      <hr className="w-full border-t-[1.7px] border-slate-300 mb-4" />

      <TableComponent<SubmissionData> columns={columns} data={data} />
    </div>
  );
};

export default Hasil;
