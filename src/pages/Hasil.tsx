import React, { useState } from 'react';
import TableComponent from '../components/Table';
import { FaArrowRight, FaDownload, FaEye } from 'react-icons/fa';
import { GetTanggalIndonesia } from '../utils/getTanggalIndonesia';

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
  // const getStatusClass = (status: string) => {
  //   switch (status) {
  //     case 'Diterima':
  //       return 'text-gray-800 bg-gray-200';
  //     case 'Bermasalah':
  //       return 'text-orange-600 hover:bg-orange-500';
  //     case 'Diubah':
  //       return 'btn-warning';
  //     case 'Ditolak':
  //       return 'btn-error';
  //     case 'Diapprove':
  //       return 'btn-success text-white';
  //     default:
  //       return 'btn-ghost';
  //   }
  // };

  // Fungsi untuk mengubah status
  // const handleStatusChange = (id: number, newStatus: string) => {
  //   const updatedData = data.map((item) => (item.id === id ? { ...item, status: newStatus } : item));
  //   setData(updatedData);
  // };

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
    // {
    //   Header: 'Status',
    //   accessor: 'status',
    //   Cell: ({ row }: any) => {
    //     const { id, status } = row.original;
    //     return (
    //       <div className={`dropdown dropdown-hover ${id === 1 ? 'dropdown-end' : 'dropdown-top'}`}>
    //         <label tabIndex={0} className={`btn ${getStatusClass(status)} btn-sm btn-outline bg-white`}>
    //           {status}
    //         </label>
    //         <ul tabIndex={0} className="dropdown-content z-10 menu p-2 shadow bg-base-100 rounded-box w-52  overflow-y-auto">
    //           {['Diterima', 'Bermasalah', 'Diubah', 'Ditolak', 'Diapprove'].map((newStatus) => (
    //             <li key={newStatus}>
    //               <button className="btn btn-ghost btn-sm " onClick={() => handleStatusChange(id, newStatus)}>
    //                 {newStatus}
    //               </button>
    //             </li>
    //           ))}
    //         </ul>
    //       </div>
    //     );
    //   },
    // },
    // {
    //   Header: 'Aksi',
    //   accessor: 'id',
    //   Cell: ({ row }: any) => {
    //     return (
    //       <button className="btn lg:btn-sm btn-md font-semibold btn-primary ">
    //         Lihat
    //         <FaEye className="text-lg" />
    //       </button>
    //     );
    //   },
    // },
  ];

  return (
    <div className="">
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

      <hr className="w-full border-t-[1.7px] border-slate-300 mb-4" />

      <TableComponent<SubmissionData> columns={columns} data={data} isDownloadable={true} />
    </div>
  );
};

export default Hasil;
