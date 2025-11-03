
import React from 'react';
import Spinner from './Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, isLoading = false, className = '', ...props }) => {
  return (
    <button
      className={`flex items-center justify-center px-6 py-3 font-semibold text-white bg-brand-blue rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 disabled:bg-brand-accent disabled:cursor-not-allowed ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
};

export default Button;
