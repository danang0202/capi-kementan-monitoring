import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaUser } from 'react-icons/fa';
// import { useAuth } from '../context/AuthContext';
import { usePassword } from '../hooks/usePassword';
import Swal from 'sweetalert2';
import user from '../data/dummyUser';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'details' | 'password'>('details');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    oldPass: '',
    newPass: '',
    confirmPass: '',
  });
  const { updatePassword } = usePassword();

  const handleTabChange = (tab: 'details' | 'password') => {
    setActiveTab(tab);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Fungsi untuk menangani perubahan input
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, // Menyalin state lama
      [name]: value, // Mengupdate field berdasarkan 'name'
    });
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentPassword = formData.oldPass;
    const newPassword = formData.newPass;
    const confirmNewPassword = formData.confirmPass;

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Isi semua field!',
      });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password baru dan konfirmasi password tidak sama!',
      });
      return;
    }

    try {
      setLoading(true);
      const response = await updatePassword(currentPassword, newPassword, confirmNewPassword);
      setLoading(false);
      if (response.statusCode !== 200) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.message,
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: 'Password berhasil diubah!',
        });
        setFormData({
          oldPass: '',
          newPass: '',
          confirmPass: '',
        });
      }
    } catch (err: any) {
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
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
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="breadcrumbs text-sm mb-2">
        <ul>
          <li>
            <a href="/">Dashboard</a>
          </li>
          <li>
            <a href="/webmon/profile">Profile</a>
          </li>
        </ul>
      </div>

      <div className="w-full flex justify-center">
        <div className="avatar mb-4 w-fit ">
          <div className="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 flex justify-center items-center">
            <FaUser className="text-primary text-8xl" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full flex justify-center">
        <div role="tablist" className="tabs tabs-bordered md:w-1/2 w-full ">
          <button role="tab" aria-selected={activeTab === 'details'} className={`tab text-xs sm:text-base  text-slate-700 ${activeTab === 'details' ? 'tab-active' : ''}`} onClick={() => handleTabChange('details')}>
            Detail Informasi
          </button>
          <button role="tab" aria-selected={activeTab === 'password'} className={`tab text-xs sm:text-base  text-slate-700 ${activeTab === 'password' ? 'tab-active' : ''}`} onClick={() => handleTabChange('password')}>
            Ganti Password
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === 'details' && (
          <div className="flex flex-col max-w-md mx-auto ">
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input type="text" placeholder="Enter full name" className="input input-bordered" value={user?.name} readOnly={true} />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="Enter email" className="input input-bordered" value={user?.email} readOnly={true} />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input type="text" placeholder="Enter Username" className="input input-bordered" value={user?.username} readOnly={true} />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Role</span>
              </label>
              <input type="text" placeholder="Enter Role" className="input input-bordered" value={user?.role} readOnly={true} />
            </div>
          </div>
        )}

        {activeTab === 'password' && (
          <div className="max-w-md mx-auto">
            <div className="form-control mb-4 ">
              <label className="label">
                <span className="label-text">Current Password</span>
              </label>
              <div className="flex items-center gap-2">
                <input type={showPassword ? 'text' : 'password'} placeholder="Enter current password" className="w-[90%] input input-bordered" required onChange={handleChange} name="oldPass" value={formData.oldPass} />
                <button className="btn btn-primary" onClick={handleShowPassword}>
                  {showPassword ? <FaEyeSlash className=" text-xl text-white border-spacing-4" /> : <FaEye className=" text-xl text-white border-spacing-4" />}
                </button>
              </div>
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">New Password</span>
              </label>
              <div className="flex items-center gap-2">
                <input type={showNewPassword ? 'text' : 'password'} placeholder="Enter new password" className="w-[90%] input input-bordered" required onChange={handleChange} name="newPass" value={formData.newPass} />
                <button className="btn btn-primary" onClick={handleShowNewPassword}>
                  {showNewPassword ? <FaEyeSlash className=" text-xl text-white border-spacing-4" /> : <FaEye className=" text-xl text-white border-spacing-4" />}
                </button>
              </div>
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Confirm New Password</span>
              </label>
              <div className="flex items-center gap-2">
                <input type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirm new password" className="w-[90%] input input-bordered" required onChange={handleChange} name="confirmPass" value={formData.confirmPass} />
                <button className="btn btn-primary" onClick={handleShowConfirmPassword}>
                  {showConfirmPassword ? <FaEyeSlash className=" text-xl text-white border-spacing-4" /> : <FaEye className=" text-xl text-white border-spacing-4" />}
                </button>
              </div>
            </div>
            <button className="btn btn-primary w-full" onClick={handleUpdatePassword}>
              Update Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
