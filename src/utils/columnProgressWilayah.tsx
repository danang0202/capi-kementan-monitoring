import { Column } from 'react-table';
import { RowItem } from '../types/Wilayah';
import ProgressBar from '../components/ProgressBar';

export const getColumns = (currentLevel: number): Column<RowItem>[] => {
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
};
