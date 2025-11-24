import React from 'react';
import { LayoutDashboard, FileText, Box, GraduationCap, Menu, Truck } from 'lucide-react';

type View = 'dashboard' | 'quotes' | 'inventory' | 'courses' | 'suppliers' | 'settings';

interface LayoutProps {
  currentView: View;
  onChangeView: (view: View) => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ currentView, onChangeView, children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'quotes', label: 'Cotizador', icon: FileText },
    { id: 'inventory', label: 'Inventario', icon: Box },
    { id: 'courses', label: 'Cursos', icon: GraduationCap },
    { id: 'suppliers', label: 'Proveedores', icon: Truck },
  ];

  // Duoc UC Colors:
  // Yellow: #FFB800 (Accents, Active states)
  // Black: #1A1A1A (Sidebar, Text)
  // Grey: #666666 (Secondary Text)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans">
      {/* Mobile Header */}
      <div className="md:hidden bg-[#1A1A1A] text-white p-4 flex justify-between items-center border-b-4 border-[#FFB800]">
        <span className="font-bold text-xl text-[#FFB800]">Duoc UC <span className="text-white font-normal text-sm ml-2">BOM Manager</span></span>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <Menu className="text-white" />
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        ${isMobileMenuOpen ? 'block' : 'hidden'} 
        md:block bg-[#1A1A1A] text-gray-300 w-full md:w-64 flex-shrink-0 transition-all duration-300 flex flex-col
      `}>
        <div className="p-6 hidden md:block border-b border-gray-800">
          <h1 className="text-2xl font-extrabold text-[#FFB800]">Duoc UC</h1>
          <p className="text-xs text-gray-400 mt-1">Gestión de Materiales</p>
        </div>
        
        <nav className="mt-6 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onChangeView(item.id as View);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center px-6 py-4 transition-all duration-200 border-l-4 ${
                  isActive 
                    ? 'bg-[#FFB800] text-[#1A1A1A] border-[#FFB800] font-bold' 
                    : 'hover:bg-[#333333] hover:text-white border-transparent text-gray-300'
                }`}
              >
                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-[#1A1A1A]' : 'text-gray-400'}`} />
                <span className="">{item.label}</span>
              </button>
            );
          })}
        </nav>
        
        <div className="p-6 bg-[#000000] text-xs text-[#666666] md:block hidden border-t border-gray-800">
          <p>Versión 1.2.0 - Institucional</p>
          <p className="mt-1 text-gray-500">Conectado como: María</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-screen bg-[#F9FAFB]">
        {children}
      </main>
    </div>
  );
};