import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Login: React.FC = () => {
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Tambahkan logika login di sini
    Swal.fire({
      title: 'Succes',
      text: 'Login Succes',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      window.location.href = '/';
    });
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" placeholder="Enter your email" className="input input-bordered w-full" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="flex items-center gap-2">
              <input type={showPassword ? 'text' : 'password'} placeholder="Enter current password" className="w-[90%] input input-bordered" required />
              <button className="btn btn-primary" type="button" onClick={handleShowPassword}>
                {showPassword ? <FaEyeSlash className=" text-xl text-white border-spacing-4" /> : <FaEye className=" text-xl text-white border-spacing-4" />}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <a href="/forgot-password" className="text-sm btn btn-secondary w-full hover:underline">
            Lupa Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
