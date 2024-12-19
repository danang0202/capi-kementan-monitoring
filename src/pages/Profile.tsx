import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'details' | 'password'>('details');

  const handleTabChange = (tab: 'details' | 'password') => {
    setActiveTab(tab);
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
      <div className="tabs">
        <button className={`tab tab-bordered font-semibold  ${activeTab === 'details' ? 'tab-active text-primary underline underline-offset-4' : ''}`} onClick={() => handleTabChange('details')}>
          User Details
        </button>
        <button className={`tab tab-bordered font-semibold  ${activeTab === 'password' ? 'tab-active text-primary underline underline-offset-4' : ''}`} onClick={() => handleTabChange('password')}>
          Change Password
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === 'details' && (
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-2">John Doe</h2>
            <p className="text-gray-600">john.doe@example.com</p>
          </div>
        )}

        {activeTab === 'password' && (
          <form className="max-w-md mx-auto">
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Current Password</span>
              </label>
              <input type="password" placeholder="Enter current password" className="input input-bordered" required />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">New Password</span>
              </label>
              <input type="password" placeholder="Enter new password" className="input input-bordered" required />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Confirm New Password</span>
              </label>
              <input type="password" placeholder="Confirm new password" className="input input-bordered" required />
            </div>
            <button className="btn btn-primary w-full">Update Password</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
