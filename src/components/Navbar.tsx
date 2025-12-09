import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { RiProfileLine } from 'react-icons/ri';
import { CiLogout } from 'react-icons/ci';
import { MenuItem, menuItemsData } from '../data/navbar';

const Navbar: React.FC = () => {
  const menuItems: MenuItem[] = menuItemsData;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const { logout } = { logout: () => (window.location.href = '/webmon/login') };

  const handleLogout = () => logout();
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="navbar fixed top-0 w-full z-20 bg-base-100/70 backdrop-blur-md border-b border-base-300/50 shadow-sm px-4 lg:px-56">
        <div className="flex-1 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            {/* when in vercel */}
            {/* <img src="/webmon/public/logo_kementan.png" alt="logo kementan" height={45} width={45} /> */}
            {/* when in local */}
            <img src="/logo_kementan.png" alt="logo kementan" height={45} width={45} />
            <div className="hidden md:block leading-tight">
              <p className="font-bold text-lg">Monitoring Survei</p>
              <p className="text-xs">Kementrian Pertanian RI</p>
            </div>
          </Link>
        </div>

        {/* Menu Desktop */}
        <div className="hidden md:flex">
          <ul className="menu menu-horizontal gap-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link to={item.path} className={`px-3 py-2 transition-all ${isActive(item.path) ? 'font-semibold border-b-2 border-primary' : 'text-base-content/70 hover:text-base-content'}`}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* User + Hamburger */}
        <div className="flex items-center relative" ref={dropdownRef}>
          <div className="hidden md:block">
            <FaUser size={22} className=" ml-4 text-primary cursor-pointer hover:scale-105 transition" onClick={toggleDropdown} />
            {isDropdownOpen && (
              <ul className="absolute right-0 mt-3 z-50 menu bg-base-100 shadow-lg rounded-xl w-52 p-2">
                <li>
                  <Link to="/profile" className="flex items-center gap-2" onClick={() => setIsDropdownOpen(false)}>
                    <RiProfileLine className="text-primary" />
                    Profil Saya
                  </Link>
                </li>
                <div className="divider my-1"></div>
                <li>
                  <button className="flex items-center gap-2 text-error" onClick={handleLogout}>
                    <CiLogout className="text-error" />
                    Keluar
                  </button>
                </li>
              </ul>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button className="md:hidden text-primary ml-3" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-16 w-full bg-base-100 shadow-lg z-10 animate-fade-down p-4">
          <ul className="menu space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link to={item.path} className={`${isActive(item.path) ? 'font-semibold text-primary' : 'text-base-content/70'}`} onClick={toggleMobileMenu}>
                  {item.name}
                </Link>
              </li>
            ))}
            <div className="divider"></div>
            <li>
              <Link to="/profile" className="flex items-center gap-2" onClick={toggleMobileMenu}>
                <RiProfileLine className="text-primary" />
                Profil Saya
              </Link>
            </li>
            <li>
              <button className="flex items-center gap-2 text-error" onClick={handleLogout}>
                <CiLogout className="text-error" />
                Keluar
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
