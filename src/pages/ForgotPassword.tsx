import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { usePassword } from '../hooks/usePassword';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { forgotPassword } = usePassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      Swal.fire({
        title: 'Error!',
        text: 'Please enter a valid email address.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    try {
      // Call the forgot password function
      setLoading(true);
      const response = await forgotPassword(email);
      setLoading(false);
      if (response.statusCode !== 200) {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to send password reset link',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } else {
        Swal.fire({
          title: 'Success!',
          text: `Password reset link has been sent to ${email}.`,
          icon: 'success',
          confirmButtonText: 'OK',
        });
      }
    } catch (err: any) {
      Swal.fire({
        title: 'Error!',
        text: err.message || 'Failed to send password reset link.',
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
        <h1 className="text-2xl font-bold text-center mb-6">Lupa Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" placeholder="Enter your email" className="input input-bordered w-full" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Kirim
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
