export const convertToIndonesianDate = (thisDate: Date) => {
  const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

  // Konversi ISO string menjadi objek Date
  const date = new Date(thisDate);

  // Ambil hari, tanggal, bulan, dan tahun
  const namaHari = hari[date.getDay()];
  const tanggal = date.getDate();
  const namaBulan = bulan[date.getMonth()];
  const tahun = date.getFullYear();

  // Format menjadi "Hari, Tanggal Bulan Tahun"
  return `${namaHari}, ${tanggal} ${namaBulan} ${tahun}`;
};
