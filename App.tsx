import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { QuoteBuilder } from './components/QuoteBuilder';
import { Inventory } from './components/Inventory';
import { CourseManager } from './components/CourseManager';
import { SupplierManager } from './components/SupplierManager';

// Types defined in Layout usually, but needed here for state
type View = 'dashboard' | 'quotes' | 'inventory' | 'courses' | 'suppliers' | 'settings';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'quotes':
        return <QuoteBuilder />;
      case 'inventory':
        return <Inventory />;
      case 'courses':
        return <CourseManager />;
      case 'suppliers':
        return <SupplierManager />;
      default:
        return <div className="flex items-center justify-center h-full text-slate-400">Vista en construcción</div>;
    }
  };

  return (
    <Layout currentView={currentView} onChangeView={setCurrentView}>
      {renderView()}
    </Layout>
  );
};

export default App;