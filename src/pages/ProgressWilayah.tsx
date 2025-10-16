import React, { useMemo, useState } from 'react';
import TableComponent from '../components/Table';
import ProgressBar from '../components/ProgressBar';
import { Progress as ProgressDataSource } from '../data/progressWilayah'; // array dari user
import { RiResetLeftLine } from 'react-icons/ri';
import aggregateBy from '../utils/agregation';
import { DataItem, RowItem } from '../types/Wilayah';

const ProgressWilayah: React.FC = () => {
  const data: DataItem[] = ProgressDataSource;

  // Filter state (string empty = not selected)
  const [selectedProvinsi, setSelectedProvinsi] = useState<string>('');
  const [selectedKabkot, setSelectedKabkot] = useState<string>('');
  const [selectedKecamatan, setSelectedKecamatan] = useState<string>('');

  // --- Utility: unique values for dropdowns ---
  const provinsiOptions = useMemo(() => {
    const s = Array.from(new Set(data.map((d) => d.provinsi))).sort();
    return s;
  }, [data]);

  const kabkotOptions = useMemo(() => {
    if (!selectedProvinsi) return [];
    const s = Array.from(new Set(data.filter((d) => d.provinsi === selectedProvinsi).map((d) => d.kabkot))).sort();
    return s;
  }, [data, selectedProvinsi]);

  const kecamatanOptions = useMemo(() => {
    if (!selectedProvinsi || !selectedKabkot) return [];
    const s = Array.from(new Set(data.filter((d) => d.provinsi === selectedProvinsi && d.kabkot === selectedKabkot).map((d) => d.kecamatan))).sort();
    return s;
  }, [data, selectedProvinsi, selectedKabkot]);

  // --- Decide current level & compute rows ---
  // Levels:
  // 0 = no provinsi selected -> group by provinsi
  // 1 = provinsi selected, no kabkot -> group by kabkot within provinsi
  // 2 = provinsi + kabkot selected, no kecamatan -> group by kecamatan within kabkot
  // 3 = provinsi + kabkot + kecamatan selected -> list desa within kecamatan (raw data)
  const currentLevel = useMemo(() => {
    if (!selectedProvinsi) return 0;
    if (selectedProvinsi && !selectedKabkot) return 1;
    if (selectedProvinsi && selectedKabkot && !selectedKecamatan) return 2;
    return 3;
  }, [selectedProvinsi, selectedKabkot, selectedKecamatan]);

  // rows to pass to table (RowItem[])
  const rows = useMemo(() => {
    switch (currentLevel) {
      case 0:
        // group by provinsi across all data
        return aggregateBy(data, (d) => d.provinsi);
      case 1:
        // group by kabkot but limit to selected provinsi
        return aggregateBy(
          data.filter((d) => d.provinsi === selectedProvinsi),
          (d) => d.kabkot
        );
      case 2:
        // group by kecamatan within provinsi + kabkot
        return aggregateBy(
          data.filter((d) => d.provinsi === selectedProvinsi && d.kabkot === selectedKabkot),
          (d) => d.kecamatan
        );
      case 3:
        // list desa raw within selected kecamatan
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

  // --- Dynamic columns for TableComponent ---
  const columns = useMemo(() => {
    // determine header name for the "name" column
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
        Cell: ({ row }: any) => row.index + 1,
      },
      {
        Header: nameHeader,
        accessor: 'name',
      },
      {
        Header: 'Progress',
        accessor: 'progress',
        Cell: ({ row }: { row: { original: RowItem } }) => {
          const { progress, value, max } = row.original;
          // ProgressBar expects value and max (we provide percentage as progress)
          // But to keep original ProgressBar usage, pass value and max fields
          return <ProgressBar value={value} max={max} label={true} percentage={true} />;
        },
      },
    ];
  }, [currentLevel]);

  // --- Handlers for cascading behavior ---
  const onProvinsiChange = (val: string) => {
    setSelectedProvinsi(val);
    // reset lower levels
    setSelectedKabkot('');
    setSelectedKecamatan('');
  };

  const onKabkotChange = (val: string) => {
    setSelectedKabkot(val);
    setSelectedKecamatan('');
  };

  const onKecamatanChange = (val: string) => {
    setSelectedKecamatan(val);
  };

  const resetAll = () => {
    setSelectedProvinsi('');
    setSelectedKabkot('');
    setSelectedKecamatan('');
  };

  // Render
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">Progress Wilayah</h1>

      {/* Filters */}
      <div className="p-4 space-y-4 rounded-md  mb-4">
        <div className="flex flex-col md:flex-row gap-2  md:justify-start">
          {/* Provinsi */}
          <div className="flex flex-col ">
            <label className="text-sm mb-1">Provinsi</label>
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
          <div className="flex flex-col ">
            <label className="text-sm mb-1">Kabupaten / Kota</label>
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
          <div className="flex flex-col ">
            <label className="text-sm mb-1">Kecamatan</label>
            <select className="select select-bordered w-64" value={selectedKecamatan} onChange={(e) => onKecamatanChange(e.target.value)} disabled={!selectedKabkot}>
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
          <div className="flex items-center">
            <button className="btn btn-primary ml-2" onClick={resetAll}>
              <RiResetLeftLine className="text-lg" />
            </button>
          </div>
        </div>

        {/* Summary: show current level & total progress */}
        <div className="pt-2">
          <div className="text-sm text-slate-600">
            Menampilkan level:{' '}
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
      <div className="rounded-md bg-white shadow-md p-4">
        <TableComponent<RowItem> columns={columns} data={rows} />
      </div>
    </div>
  );
};

export default ProgressWilayah;
