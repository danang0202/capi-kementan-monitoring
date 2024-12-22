import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaUser } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'details' | 'password'>('details');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const { user } = useAuth();

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

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="breadcrumbs text-sm mb-2">
        <ul>
          <li>
            <a href="/">Dashboard</a>
          </li>
          <li>
            <a href="/profile">Profile</a>
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
                <input type={showPassword ? 'text' : 'password'} placeholder="Enter current password" className="w-[90%] input input-bordered" required />
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
                <input type={showNewPassword ? 'text' : 'password'} placeholder="Enter new password" className="w-[90%] input input-bordered" required />
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
                <input type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirm new password" className="w-[90%] input input-bordered" required />
                <button className="btn btn-primary" onClick={handleShowConfirmPassword}>
                  {showConfirmPassword ? <FaEyeSlash className=" text-xl text-white border-spacing-4" /> : <FaEye className=" text-xl text-white border-spacing-4" />}
                </button>
              </div>
            </div>
            <button className="btn btn-primary w-full">Update Password</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
