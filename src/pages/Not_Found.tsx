import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="text-center p-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p>Halaman yang anda cari tidak ada.</p>
      <Link to="/" className="btn btn-primary mt-4">
        Kembali ke Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
