
import React from 'react';
import { View } from '../types';
import { DashboardIcon, CampaignIcon, AnalyzeIcon, MonetizationIcon, ReportingIcon, LibraryIcon, CloseIcon } from './Icons';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <li
    onClick={onClick}
    className={`flex items-center p-3 my-1 rounded-md cursor-pointer transition-colors duration-200 ${
      isActive
        ? 'bg-brand-blue text-white'
        : 'text-brand-light hover:bg-brand-accent hover:text-brand-text'
    }`}
  >
    {icon}
    <span className="ml-4 font-medium">{label}</span>
  </li>
);

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, isOpen, setIsOpen }) => {
  const navItems = [
    { view: View.Dashboard, label: 'Dashboard', icon: <DashboardIcon /> },
    { view: View.Campaigns, label: 'Campaigns', icon: <CampaignIcon /> },
    { view: View.Analyze, label: 'Analyze Content', icon: <AnalyzeIcon /> },
    { view: View.ContentLibrary, label: 'Content Library', icon: <LibraryIcon /> },
    { view: View.Monetization, label: 'Monetization', icon: <MonetizationIcon /> },
    { view: View.Reporting, label: 'Reporting', icon: <ReportingIcon /> },
  ];

  const handleNavClick = (view: View) => {
    setCurrentView(view);
    setIsOpen(false);
  }

  return (
    <>
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)}></div>
      <aside className={`absolute lg:relative flex flex-col w-64 bg-brand-primary text-brand-text p-4 h-full z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex justify-between items-center mb-8 lg:hidden">
            <h2 className="text-2xl font-bold">Menu</h2>
            <button onClick={() => setIsOpen(false)}><CloseIcon /></button>
        </div>
        <nav>
          <ul>
            {navItems.map((item) => (
              <NavItem
                key={item.view}
                icon={item.icon}
                label={item.label}
                isActive={currentView === item.view}
                onClick={() => handleNavClick(item.view)}
              />
            ))}
          </ul>
        </nav>
        <div className="mt-auto text-center text-brand-light text-xs">
            <p>&copy; 2024 Modulr Studio</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;