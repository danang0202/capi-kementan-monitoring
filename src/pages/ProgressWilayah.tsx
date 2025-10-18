import React from 'react';
import TableComponent from '../components/Table';
import { Progress as ProgressDataSource } from '../data/progressWilayah';
import { RiResetLeftLine } from 'react-icons/ri';
import { useWilayahFilter } from '../hooks/useWilayahFilter';
import { getColumns } from '../utils/columnProgressWilayah';
import { RowItem } from '../types/Wilayah';

const ProgressWilayah: React.FC = () => {
  const data = ProgressDataSource;

  const { selectedProvinsi, selectedKabkot, selectedKecamatan, setSelectedProvinsi, setSelectedKabkot, setSelectedKecamatan, provinsiOptions, kabkotOptions, kecamatanOptions, currentLevel, rows, resetAll } = useWilayahFilter(data);

  const columns = getColumns(currentLevel);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Progress Wilayah</h1>
        <div className="text-sm breadcrumbs mt-2">
          <ul className="text-gray-500">
            <li>
              <a href="/" className="hover:text-gray-700">
                Dashboard
              </a>
            </li>
            <li className="text-gray-700 font-medium">Progress Wilayah</li>
          </ul>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Filter Wilayah</h2>

        <div className="flex flex-col md:flex-row md:flex-wrap gap-4">
          {/* Provinsi */}
          <div className="flex flex-col">
            <label className="text-sm mb-1 text-gray-600">Provinsi</label>
            <select className="select select-bordered w-64" value={selectedProvinsi} onChange={(e) => setSelectedProvinsi(e.target.value)}>
              <option value="">-- Semua Provinsi --</option>
              {provinsiOptions.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Kabupaten/Kota */}
          <div className="flex flex-col">
            <label className="text-sm mb-1 text-gray-600">Kabupaten / Kota</label>
            <select className="select select-bordered w-64" value={selectedKabkot} onChange={(e) => setSelectedKabkot(e.target.value)} disabled={!selectedProvinsi}>
              <option value="">-- Semua Kabupaten/Kota --</option>
              {kabkotOptions.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
            {!selectedProvinsi && <small className="text-xs text-slate-500">Pilih provinsi dulu</small>}
          </div>

          {/* Kecamatan */}
          <div className="flex flex-col">
            <label className="text-sm mb-1 text-gray-600">Kecamatan</label>
            <select className="select select-bordered w-64" value={selectedKecamatan} onChange={(e) => setSelectedKecamatan(e.target.value)} disabled={!selectedKabkot}>
              <option value="">-- Semua Kecamatan --</option>
              {kecamatanOptions.map((kec) => (
                <option key={kec} value={kec}>
                  {kec}
                </option>
              ))}
            </select>
            {!selectedKabkot && <small className="text-xs text-slate-500">Pilih kabupaten/kota dulu</small>}
          </div>

          {/* Reset */}
          <div className="flex flex-col mt-6">
            <button className="btn btn-outline btn-sm h-12" onClick={resetAll}>
              <RiResetLeftLine className="text-lg" />
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="pt-2">
          <div className="text-sm text-slate-600">
            Level saat ini:{' '}
            <span className="font-medium">
              {currentLevel === 0 && 'Provinsi (agregat semua provinsi)'}
              {currentLevel === 1 && `Kabupaten/Kota di Provinsi: ${selectedProvinsi}`}
              {currentLevel === 2 && `Kecamatan di Kabupaten/Kota: ${selectedKabkot}`}
              {currentLevel === 3 && `Desa di Kecamatan: ${selectedKecamatan}`}
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <TableComponent<RowItem> columns={columns} data={rows} />
      </div>
    </div>
  );
};

export default ProgressWilayah;
