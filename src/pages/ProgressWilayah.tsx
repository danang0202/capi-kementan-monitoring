import React, { useMemo, useState } from 'react';
import TableComponent from '../components/Table';
import ProgressBar from '../components/ProgressBar';
import { Progress as ProgressDataSource } from '../data/progressWilayah';
import { RiResetLeftLine } from 'react-icons/ri';
import aggregateBy from '../utils/agregation';
import { DataItem, RowItem } from '../types/Wilayah';

const ProgressWilayah: React.FC = () => {
  const data: DataItem[] = ProgressDataSource;

  const [selectedProvinsi, setSelectedProvinsi] = useState<string>('');
  const [selectedKabkot, setSelectedKabkot] = useState<string>('');
  const [selectedKecamatan, setSelectedKecamatan] = useState<string>('');

  // Dropdown options
  const provinsiOptions = useMemo(() => Array.from(new Set(data.map((d) => d.provinsi))).sort(), [data]);

  const kabkotOptions = useMemo(() => {
    if (!selectedProvinsi) return [];
    return Array.from(new Set(data.filter((d) => d.provinsi === selectedProvinsi).map((d) => d.kabkot))).sort();
  }, [data, selectedProvinsi]);

  const kecamatanOptions = useMemo(() => {
    if (!selectedProvinsi || !selectedKabkot) return [];
    return Array.from(new Set(data.filter((d) => d.provinsi === selectedProvinsi && d.kabkot === selectedKabkot).map((d) => d.kecamatan))).sort();
  }, [data, selectedProvinsi, selectedKabkot]);

  // Level logic
  const currentLevel = useMemo(() => {
    if (!selectedProvinsi) return 0;
    if (selectedProvinsi && !selectedKabkot) return 1;
    if (selectedProvinsi && selectedKabkot && !selectedKecamatan) return 2;
    return 3;
  }, [selectedProvinsi, selectedKabkot, selectedKecamatan]);

  // Rows for table
  const rows = useMemo(() => {
    switch (currentLevel) {
      case 0:
        return aggregateBy(data, (d) => d.provinsi);
      case 1:
        return aggregateBy(
          data.filter((d) => d.provinsi === selectedProvinsi),
          (d) => d.kabkot
        );
      case 2:
        return aggregateBy(
          data.filter((d) => d.provinsi === selectedProvinsi && d.kabkot === selectedKabkot),
          (d) => d.kecamatan
        );
      case 3:
        return data
          .filter((d) => d.provinsi === selectedProvinsi && d.kabkot === selectedKabkot && d.kecamatan === selectedKecamatan)
          .map((d) => ({
            id: d.id,
            name: d.desa,
            value: d.value,
            max: d.max,
            progress: d.max > 0 ? (d.value / d.max) * 100 : 0,
            provinsi: d.provinsi,
            kabkot: d.kabkot,
            kecamatan: d.kecamatan,
            desa: d.desa,
          }));
      default:
        return [];
    }
  }, [currentLevel, data, selectedProvinsi, selectedKabkot, selectedKecamatan]);

  // Columns
  const columns = useMemo(() => {
    let nameHeader = 'Name';
    if (currentLevel === 0) nameHeader = 'Provinsi';
    else if (currentLevel === 1) nameHeader = 'Kabupaten/Kota';
    else if (currentLevel === 2) nameHeader = 'Kecamatan';
    else if (currentLevel === 3) nameHeader = 'Desa';

    return [
      {
        Header: 'No',
        accessor: (_, rowIndex: number) => rowIndex + 1,
        id: 'no',
        Cell: ({ row }: any) => <div className="text-center">{row.index + 1}</div>,
      },
      {
        Header: nameHeader,
        accessor: 'name',
        Cell: ({ value }: { value: string }) => <span className="font-medium text-gray-700">{value}</span>,
      },
      {
        Header: 'Progress',
        accessor: 'progress',
        Cell: ({ row }: { row: { original: RowItem } }) => {
          const { value, max } = row.original;
          return (
            <div className="w-full">
              <ProgressBar value={value} max={max} label={true} percentage={true} />
            </div>
          );
        },
      },
    ];
  }, [currentLevel]);

  // Handlers
  const onProvinsiChange = (val: string) => {
    setSelectedProvinsi(val);
    setSelectedKabkot('');
    setSelectedKecamatan('');
  };

  const onKabkotChange = (val: string) => {
    setSelectedKabkot(val);
    setSelectedKecamatan('');
  };

  const resetAll = () => {
    setSelectedProvinsi('');
    setSelectedKabkot('');
    setSelectedKecamatan('');
  };

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
            <select className="select select-bordered w-64" value={selectedProvinsi} onChange={(e) => onProvinsiChange(e.target.value)}>
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
            <select className="select select-bordered w-64" value={selectedKabkot} onChange={(e) => onKabkotChange(e.target.value)} disabled={!selectedProvinsi}>
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
