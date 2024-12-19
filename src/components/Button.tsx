import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void; // onClick bersifat opsional
  variant?: 'primary' | 'secondary' | 'accent'; // variant harus salah satu dari tiga opsi
}

const Button: React.FC<ButtonProps> = ({ label, onClick = () => {}, variant = 'primary' }) => {
  const baseStyles = 'btn px-4 py-2 font-bold';
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
