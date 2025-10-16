import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer bg-base-100 p-4 flex justify-center items-center text-gray-500">
      <p className=" text-center">&copy; {new Date().getFullYear()} Kementan. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
