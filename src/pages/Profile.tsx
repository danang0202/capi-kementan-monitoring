import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaUser } from 'react-icons/fa';
import Swal from 'sweetalert2';
import user from '../data/dummyUser';
import { usePassword } from '../hooks/usePassword';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'details' | 'password'>('details');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ oldPass: '', newPass: '', confirmPass: '' });

  const { updatePassword } = usePassword();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const { oldPass, newPass, confirmPass } = formData;
    if (!oldPass || !newPass || !confirmPass) {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Isi semua field!' });
      return;
    }
    if (newPass !== confirmPass) {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Password baru dan konfirmasi tidak sama!' });
      return;
    }
    try {
      setLoading(true);
      const response = await updatePassword(oldPass, newPass, confirmPass);
      setLoading(false);
      if (response.statusCode !== 200) {
        Swal.fire({ icon: 'error', title: 'Oops...', text: response.message });
      } else {
        Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Password berhasil diubah!' });
        setFormData({ oldPass: '', newPass: '', confirmPass: '' });
      }
    } catch (err: any) {
      setLoading(false);
      Swal.fire({ icon: 'error', title: 'Oops...', text: err.message });
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loading loading-bars loading-lg"></div>
      </div>
    );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="breadcrumbs text-sm mb-3 text-gray-500">
        <ul>
          <li>
            <a href="/" className="hover:text-gray-700">
              Dashboard
            </a>
          </li>
          <li className="font-medium text-gray-700">Profile</li>
        </ul>
      </div>

      <div className="flex justify-center mb-6">
        <div className="avatar w-fit">
          <div className="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 flex justify-center items-center p-2 shadow-sm">
            <FaUser className="text-primary text-8xl" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-4">
        <div role="tablist" className="tabs tabs-bordered md:w-1/2 w-full">
          <button role="tab" aria-selected={activeTab === 'details'} className={`tab text-xs sm:text-sm text-slate-700 ${activeTab === 'details' ? 'tab-active' : ''}`} onClick={() => setActiveTab('details')}>
            Detail Informasi
          </button>
          <button role="tab" aria-selected={activeTab === 'password'} className={`tab text-xs sm:text-sm text-slate-700 ${activeTab === 'password' ? 'tab-active' : ''}`} onClick={() => setActiveTab('password')}>
            Ganti Password
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'details' && (
        <div className="flex flex-col max-w-md mx-auto space-y-3">
          {[
            { label: 'Full Name', value: user?.name },
            { label: 'Email', value: user?.email },
            { label: 'Username', value: user?.username },
            { label: 'Role', value: user?.role },
          ].map((item, idx) => (
            <div key={idx} className="form-control w-full">
              <label className="label text-sm">
                <span className="label-text">{item.label}</span>
              </label>
              <input type="text" className="input input-bordered text-sm" value={item.value} readOnly />
            </div>
          ))}
        </div>
      )}

      {activeTab === 'password' && (
        <div className="max-w-md mx-auto space-y-3">
          {[
            { label: 'Current Password', value: formData.oldPass, show: showPassword, toggle: () => setShowPassword(!showPassword), name: 'oldPass' },
            { label: 'New Password', value: formData.newPass, show: showNewPassword, toggle: () => setShowNewPassword(!showNewPassword), name: 'newPass' },
            { label: 'Confirm New Password', value: formData.confirmPass, show: showConfirmPassword, toggle: () => setShowConfirmPassword(!showConfirmPassword), name: 'confirmPass' },
          ].map((item, idx) => (
            <div key={idx} className="form-control w-full">
              <label className="label text-sm">
                <span className="label-text">{item.label}</span>
              </label>
              <div className="flex items-center gap-2">
                <input type={item.show ? 'text' : 'password'} placeholder={item.label} className="input input-bordered text-sm flex-1" name={item.name} value={item.value} onChange={handleChange} required />
                <button className="btn btn-outline btn-sm p-2" type="button" onClick={item.toggle}>
                  {item.show ? <FaEyeSlash className="text-gray-700" /> : <FaEye className="text-gray-700" />}
                </button>
              </div>
            </div>
          ))}
          <button className="btn btn-primary w-full text-sm" onClick={handleUpdatePassword}>
            Update Password
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
