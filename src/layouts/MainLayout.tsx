import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
  excludeLayout?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, excludeLayout = false }) => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden flex flex-col justify-center items-center bg-gray-50">
      {/* Conditionally render Navbar and Footer */}
      {!excludeLayout && <Navbar />}
      <main className="flex-grow md:w-[95%] w-[98%] my-16">{children}</main>
      {!excludeLayout && <Footer />}
    </div>
  );
};

export default MainLayout;
