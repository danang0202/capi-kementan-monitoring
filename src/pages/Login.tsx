import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';
// import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  // const { login, isAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Login Berhasil',
  //       text: 'Login sukses, Anda akan diarahkan ke halaman Dashboard',
  //     }).then(() => navigate('/'));
  //   }
  // });

  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     // Panggil fungsi login
  //     await login(username, password);
  //   } catch (err: any) {
  //     // Jika gagal, tampilkan pesan error yang relevan
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Login Gagal',
  //       text: err.message || 'Username atau Password salah',
  //     });
  //   }
  // };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginByPass = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = '/';
  };

  return (
    <div className="flex justify-center items-center max-h-screen ">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleLoginByPass} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input type="text" placeholder="Enter your username" className="input input-bordered w-full" required onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="flex items-center gap-2">
              <input type={showPassword ? 'text' : 'password'} placeholder="Enter current password" className="w-[90%] input input-bordered" required onChange={(e) => setPassword(e.target.value)} />
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
          <a href="/webmon/forgot-password" className="text-sm text-gray-600 hover:text-primary transition-colors duration-200 hover:underline">
            Lupa Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
