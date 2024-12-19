import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { RiProfileLine } from 'react-icons/ri';
import { CiLogout } from 'react-icons/ci';

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar bg-base-100/90 z-10 shadow-md flex items-center justify-between px-4 fixed top-0">
      <div className="navbar-start">
        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          <img src="/public/logo kementan.png" alt="logo kementan" height={50} width={50} />
          <div className="block text-sm font-normal">
            <p className="text-lg font-bold">Web Monitoring</p>
            PATANAS Awyeah
          </div>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 font-semibold">
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/progress">Progress Cacah</Link>
          </li>
          <li>
            <Link to="/hasil">Hasil Cacah</Link>
          </li>
          <li>
            <Link to="/faq">FAQ</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end pr-2 relative font-semibold" ref={dropdownRef}>
        <div className="relative">
          <FaUser size={24} className="text-primary hover:text-green-900 cursor-pointer" onClick={toggleDropdown} />
          {isDropdownOpen && (
            <ul className="absolute right-0 z-50 dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <Link to="/profile" className="flex items-center gap-2" onClick={() => setIsDropdownOpen(false)}>
                  <RiProfileLine className="text-primary" />
                  Profil Saya
                </Link>
              </li>
              <li>
                <Link to="/login" className="flex items-center gap-2 text-error" onClick={() => setIsDropdownOpen(false)}>
                  <CiLogout className="text-error" />
                  Keluar
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
