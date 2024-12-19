import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden flex flex-col justify-center items-center bg-gray-50">
      <Navbar />
      <main className="flex-grow md:w-[95%] w-[98%] my-16 ">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
