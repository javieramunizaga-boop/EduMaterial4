import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, AlertTriangle, DollarSign, Package } from 'lucide-react';

const data = [
  { name: 'Ene', cost: 4000, savings: 2400 },
  { name: 'Feb', cost: 3000, savings: 1398 },
  { name: 'Mar', cost: 2000, savings: 9800 },
  { name: 'Abr', cost: 2780, savings: 3908 },
  { name: 'May', cost: 1890, savings: 4800 },
  { name: 'Jun', cost: 2390, savings: 3800 },
];

const stockData = [
  { name: 'Soldadura', stock: 85 },
  { name: 'Electricidad', stock: 45 },
  { name: 'Seguridad', stock: 90 },
  { name: 'Papelería', stock: 30 },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <header className="mb-8 border-b border-gray-200 pb-4">
        <h2 className="text-3xl font-bold text-[#1A1A1A]">Dashboard General</h2>
        <p className="text-[#666666] mt-1">Resumen de operaciones, inventario y costos.</p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-[#FFB800]">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-bold text-[#666666]">Cotizaciones Activas</p>
              <h3 className="text-3xl font-bold text-[#1A1A1A] mt-2">12</h3>
            </div>
            <div className="p-2 bg-yellow-50 text-[#FFB800] rounded-lg">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <span className="text-xs text-[#1A1A1A] font-medium mt-4 block">+15% vs mes anterior</span>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-[#1A1A1A]">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-bold text-[#666666]">Alertas de Stock</p>
              <h3 className="text-3xl font-bold text-[#1A1A1A] mt-2">3</h3>
            </div>
            <div className="p-2 bg-gray-100 text-[#1A1A1A] rounded-lg">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
          <span className="text-xs text-red-600 font-medium mt-4 block">Requiere atención inmediata</span>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-[#666666]">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-bold text-[#666666]">Gasto Mensual</p>
              <h3 className="text-3xl font-bold text-[#1A1A1A] mt-2">$45,200</h3>
            </div>
            <div className="p-2 bg-gray-50 text-[#666666] rounded-lg">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
          <span className="text-xs text-green-600 font-medium mt-4 block">-5% optimización lograda</span>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-[#FFB800]">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-bold text-[#666666]">Cursos Ejecutados</p>
              <h3 className="text-3xl font-bold text-[#1A1A1A] mt-2">8</h3>
            </div>
            <div className="p-2 bg-yellow-50 text-[#FFB800] rounded-lg">
              <Package className="w-6 h-6" />
            </div>
          </div>
          <span className="text-xs text-[#666666] font-medium mt-4 block">En los últimos 30 días</span>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-[#1A1A1A] mb-6">Tendencia de Costos</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#666666" fontSize={12} />
                <YAxis stroke="#666666" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend />
                {/* Brand Colors in Chart */}
                <Line type="monotone" dataKey="cost" stroke="#1A1A1A" strokeWidth={3} name="Costo Real" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="savings" stroke="#FFB800" strokeWidth={3} name="Ahorros Proyectados" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-[#1A1A1A] mb-6">Nivel de Inventario por Categoría</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stockData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#666666" fontSize={12} />
                <YAxis stroke="#666666" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="stock" fill="#FFB800" radius={[4, 4, 0, 0]} name="Nivel de Stock (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};