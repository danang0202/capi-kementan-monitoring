import React, { useState } from 'react';
import Swal from 'sweetalert2';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
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

    // Here you can add your logic to handle the forgot password request
    Swal.fire({
      title: 'Success!',
      text: `Password reset link has been sent to ${email}.`,
      icon: 'success',
      confirmButtonText: 'OK',
    });
  };

  return (
    <div className="flex justify-center items-center max-h-screen">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg ">
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
