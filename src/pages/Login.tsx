import React from 'react';

const Login: React.FC = () => {
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Tambahkan logika login di sini
    console.log('Login form submitted');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
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
            <input type="password" placeholder="Enter your password" className="input input-bordered w-full" required />
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
