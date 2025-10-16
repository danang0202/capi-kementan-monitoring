import React, { useState } from 'react';
import TableComponent from '../components/Table';
import { FaEye, FaDownload } from 'react-icons/fa';
import Alert from '../components/Alert';

interface SubmissionData {
  id: number;
  timestamp: string;
  submitter: string;
  labelRumahTangga: string;
  status: string;
}

const Hasil: React.FC = () => {
  const [data] = useState<SubmissionData[]>([
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

  const { showConfirmation, showAlert } = Alert();

  const handleDownload = () => {
    showConfirmation({
      title: 'Konfirmasi Unduh',
      text: 'Apakah Anda yakin ingin mengunduh data ini?',
      icon: 'warning',
      confirmButtonText: 'Ya, Unduh',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        showAlert({
          title: 'Berhasil',
          text: 'Hasil pencacahan berhasil diunduh',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      }
    });
  };

  // Fungsi badge modern
  // const StatusBadge = ({ status }: { status: string }) => {
  //   const base = 'px-3 py-1 rounded-full text-sm font-medium';
  //   const style = status === 'Diterima' ? 'bg-green-100 text-green-700' : status === 'Ditolak' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700';
  //   return <span className={`${base} ${style}`}>{status}</span>;
  // };

  const columns: any[] = [
    {
      Header: 'Timestamp',
      accessor: 'timestamp',
      Cell: ({ value }: any) => <span className="text-gray-700">{value}</span>,
    },
    {
      Header: 'Submitter',
      accessor: 'submitter',
      Cell: ({ value }: any) => <span className="font-medium text-gray-800">{value}</span>,
    },
    {
      Header: 'Label Rumah Tangga',
      accessor: 'labelRumahTangga',
      Cell: ({ value }: any) => <span className="text-gray-700">{value}</span>,
    },
    // {
    //   Header: 'Status',
    //   accessor: 'status',
    //   Cell: ({ value }: any) => <StatusBadge status={value} />,
    // },
    // {
    //   Header: 'Aksi',
    //   accessor: 'id',
    //   Cell: () => (
    //     <button className="btn btn-sm btn-outline rounded-lg flex items-center gap-2 hover:bg-gray-100">
    //       <FaEye className="text-base" />
    //       Lihat
    //     </button>
    //   ),
    // },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Hasil Pencacahan</h1>
        <div className="breadcrumbs text-sm mt-1 text-gray-500">
          <ul>
            <li>
              <a href="/" className="hover:text-gray-700">
                Dashboard
              </a>
            </li>
            <li className="font-medium text-gray-700">Hasil Pencacahan</li>
          </ul>
        </div>
      </div>

      {/* Card Tabel */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-800">Daftar Hasil</h2>

          {/* Tombol Download Modern */}
          <button onClick={handleDownload} className="btn btn-sm btn-primary rounded-lg flex items-center gap-2 hover:bg-gray-100">
            <FaDownload className="text-base" />
            Download
          </button>
        </div>

        <TableComponent<SubmissionData> columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Hasil;
