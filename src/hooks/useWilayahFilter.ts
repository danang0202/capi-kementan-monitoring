import { useState, useMemo } from 'react';
import aggregateBy from '../utils/agregation';
import { DataItem, RowItem } from '../types/Wilayah';

export const useWilayahFilter = (data: DataItem[]) => {
  const [selectedProvinsi, setSelectedProvinsi] = useState('');
  const [selectedKabkot, setSelectedKabkot] = useState('');
  const [selectedKecamatan, setSelectedKecamatan] = useState('');

  const provinsiOptions = useMemo(() => Array.from(new Set(data.map((d) => d.provinsi))).sort(), [data]);

  const kabkotOptions = useMemo(() => {
    if (!selectedProvinsi) return [];
    return Array.from(new Set(data.filter((d) => d.provinsi === selectedProvinsi).map((d) => d.kabkot))).sort();
  }, [data, selectedProvinsi]);

  const kecamatanOptions = useMemo(() => {
    if (!selectedProvinsi || !selectedKabkot) return [];
    return Array.from(new Set(data.filter((d) => d.provinsi === selectedProvinsi && d.kabkot === selectedKabkot).map((d) => d.kecamatan))).sort();
  }, [data, selectedProvinsi, selectedKabkot]);

  const currentLevel = useMemo(() => {
    if (!selectedProvinsi) return 0;
    if (selectedProvinsi && !selectedKabkot) return 1;
    if (selectedProvinsi && selectedKabkot && !selectedKecamatan) return 2;
    return 3;
  }, [selectedProvinsi, selectedKabkot, selectedKecamatan]);

  const rows: RowItem[] = useMemo(() => {
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

  const resetAll = () => {
    setSelectedProvinsi('');
    setSelectedKabkot('');
    setSelectedKecamatan('');
  };

  return {
    selectedProvinsi,
    selectedKabkot,
    selectedKecamatan,
    setSelectedProvinsi,
    setSelectedKabkot,
    setSelectedKecamatan,
    provinsiOptions,
    kabkotOptions,
    kecamatanOptions,
    currentLevel,
    rows,
    resetAll,
  };
};
