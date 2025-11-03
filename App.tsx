
import React, { useState } from 'react';
import { View } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/views/Dashboard';
import Campaigns from './components/views/Campaigns';
import Analyze from './components/views/Analyze';
import Monetization from './components/views/Monetization';
import Reporting from './components/views/Reporting';
import ContentLibrary from './components/views/ContentLibrary';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.Dashboard);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case View.Dashboard:
        return <Dashboard />;
      case View.Campaigns:
        return <Campaigns />;
      case View.Analyze:
        return <Analyze />;
      case View.Monetization:
        return <Monetization />;
      case View.Reporting:
        return <Reporting />;
      case View.ContentLibrary:
        return <ContentLibrary />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-brand-secondary text-brand-text">
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        isOpen={isSidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-brand-secondary p-4 sm:p-6 lg:p-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;