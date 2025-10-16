// Tipe data input (sama seperti yang kamu kirim)
interface DataItem {
  id: number;
  desa: string;
  kecamatan: string;
  kabkot: string;
  provinsi: string;
  value: number;
  max: number;
}

// Tipe untuk baris yang ditampilkan pada tabel (grouped atau raw)
interface RowItem {
  id?: string | number;
  name: string; // nama grup (Prov/Kab/Kec/Desa)
  value: number; // total value (sum)
  max: number; // total max (sum)
  progress: number; // persen 0-100
  // optional fields to keep reference for drilling or key
  provinsi?: string;
  kabkot?: string;
  kecamatan?: string;
  desa?: string;
}

export type { DataItem, RowItem };
