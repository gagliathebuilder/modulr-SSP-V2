
import React from 'react';
import { MenuIcon } from './Icons';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="bg-brand-primary text-brand-text p-4 flex items-center justify-between shadow-md z-20">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="text-brand-light mr-4 lg:hidden">
          <MenuIcon />
        </button>
        <h1 className="text-2xl font-bold tracking-wider">Modulr Studio</h1>
      </div>
      <div className="flex items-center">
        <div className="w-10 h-10 bg-brand-accent rounded-full flex items-center justify-center">
          <span className="font-bold text-brand-text">U</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
