import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { usePassword } from '../hooks/usePassword';
import { useLocation } from 'react-router-dom';

const ResetPassword: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [loading, setLoading] = useState(true);
  const { resetPassword, checkResetToken } = usePassword();

  // State untuk menyimpan token dari URL
  const [token, setToken] = useState<string | null>(null);

  // Ambil token dari URL saat halaman dimuat
  const location = useLocation();

  //   check valid token
  useEffect(() => {
    // Fungsi async di dalam useEffect
    const fetchToken = async () => {
      const searchParams = new URLSearchParams(location.search); // Mengambil query parameter dari URL
      const tokenFromUrl = searchParams.get('token'); // Ambil nilai dari parameter 'token'

      if (tokenFromUrl) {
        try {
          // Memanggil fungsi async untuk memeriksa token
          setLoading(true);
          const response = await checkResetToken(tokenFromUrl);
          if (response.statusCode !== 200) {
            Swal.fire({
              title: 'Error!',
              text: 'Token tidak valid atau sudah kadaluarsa!',
              icon: 'error',
              confirmButtonText: 'OK',
            }).then(() => {
              // Redirect ke halaman login jika token tidak valid  atau sudah kadaluarsa
              window.location.href = '/login';
            });
          }
          setToken(tokenFromUrl); // Simpan token di state jika valid
          setLoading(false);
        } catch (err) {
          console.error('check reset token error:', err);
          Swal.fire({
            title: 'Error!',
            text: 'Token tidak valid atau sudah kadaluarsa!',
            icon: 'error',
            confirmButtonText: 'OK',
          }).then(() => {
            // Redirect ke halaman login jika token tidak valid  atau sudah kadaluarsa
            window.location.href = '/login';
          });
        }
      } else {
        // Jika token tidak ada di URL
        Swal.fire({
          title: 'Error!',
          text: 'Token tidak ditemukan!',
          icon: 'error',
          confirmButtonText: 'OK',
        }).then(() => {
          // Redirect ke halaman login jika token tidak valid  atau sudah kadaluarsa
          window.location.href = '/login';
        });
      }
    };

    // Memanggil fungsi async
    fetchToken();
  }, [location.search]); // Dependensi tetap sama

  // Fungsi untuk menangani perubahan input
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, // Menyalin state lama
      [name]: value, // Mengupdate field berdasarkan 'name'
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Call the forgot password function
      setLoading(true);
      const response = await resetPassword(formData.email, formData.newPassword, formData.confirmNewPassword, token || '');
      setLoading(false);
      if (response.statusCode !== 200) {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to reset password',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } else {
        Swal.fire({
          title: 'Success!',
          text: `Password has been reset for ${formData.email}.`,
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          // Redirect ke halaman login jika berhasil mereset password
          window.location.href = '/login';
        });
      }
    } catch (err: any) {
      Swal.fire({
        title: 'Error!',
        text: err.message || 'Failed to reset password.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loading loading-bars loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center max-h-screen">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl ">
        <h1 className="text-2xl font-bold text-center mb-6">Reset Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" placeholder="Enter your email" className="input input-bordered w-full" required value={formData.email} onChange={handleChange} name="email" />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Password Baru</span>
            </label>
            <input type="password" placeholder="Enter your new password" className="input input-bordered w-full" required value={formData.newPassword} onChange={handleChange} name="newPassword" />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Konfirmasi Password Baru</span>
            </label>
            <input type="password" placeholder="Enter your confirm password" className="input input-bordered w-full" required value={formData.confirmNewPassword} onChange={handleChange} name="confirmNewPassword" />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Ubah Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
