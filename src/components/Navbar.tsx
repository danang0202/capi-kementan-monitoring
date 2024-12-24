import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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

  const isActive = (path: string) => location.pathname === path;
  return (
    <>
      {/* Desktop */}
      <nav className="navbar bg-base-100/90 z-10 shadow-md flex items-center justify-between px-4 lg:px-36 fixed top-0 w-full">
        <div className="navbar-start">
          <Link to="/" className="text-xl font-bold flex items-center gap-2">
            <img src="/public/logo kementan.png" alt="logo kementan" height={50} width={50} />
            <div className="md:block text-sm font-normal hidden">
              <p className="text-lg font-bold">Monitoring Survei</p>
              Kementrian Pertanian RI
            </div>
          </Link>
        </div>
        <div className="hidden md:flex flex-none">
          <ul className="menu menu-horizontal px-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={isActive(item.path) ? 'text-primary font-semibold' : ''}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="navbar-end pr-2 relative" ref={dropdownRef}>
          <div className="hidden md:block">
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
                  <button className="flex items-center gap-2 text-error" onClick={handleLogout}>
                    <CiLogout className="text-error" />
                    Keluar
                  </button>
                </li>
              </ul>
            )}
          </div>
          {/* Mobile Menu Button */}
          <button className="block md:hidden text-primary focus:outline-none" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="bg-base-100 shadow-md fixed top-16 left-0 w-full z-20 md:hidden">
          <ul className="menu p-4">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={isActive(item.path) ? 'text-primary font-semibold' : ''}
                  onClick={toggleMobileMenu}
                >
                  {item.name}
                </Link>
              </li>
            ))}
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
