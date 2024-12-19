import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { RiProfileLine } from 'react-icons/ri';
import { CiLogout } from 'react-icons/ci';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar bg-base-100 shadow-md flex items-center justify-between">
      <div className="navbar-start">
        <Link to="/" className="text-xl font-bold flex items-center  gap-2">
          <img src="/public/logo kementan.png" alt="logo kementan" height={50} width={50} />
          PATANAS Awyeah
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 ">
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/">Progress Cacah</Link>
          </li>
          <li>
            <Link to="/">Hasil Cacah</Link>
          </li>
          {/* <li>
            <Link to="/">Lokasi PPL</Link>
          </li> */}
          <li>
            <Link to="/">FAQ</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end pr-2">
        <li className="dropdown dropdown-hover dropdown-end">
          <FaUser size={24} className="text-secondary hover:text-primary" />
          <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <Link to="/profil">
                <RiProfileLine className="text-secondary hover:text-primary" />
                Profil Saya
              </Link>
            </li>
            <li className="group-hover:text-red-900 text-error">
              <Link to="/login">
                <CiLogout className="text-error " />
                Keluar
              </Link>
            </li>
          </ul>
        </li>
      </div>
    </nav>
  );
};

export default Navbar;
