import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
      <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-2">Halaman Tidak Ditemukan</h2>
      <p className="text-gray-500 mb-6 max-w-md">Maaf, halaman yang anda cari tidak tersedia. Silakan kembali ke dashboard atau periksa URL anda.</p>
      <Link to="/" className="btn btn-primary px-6 py-3 text-white text-sm font-medium rounded-lg shadow-md transition-all duration-200 hover:brightness-90">
        Kembali ke Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
