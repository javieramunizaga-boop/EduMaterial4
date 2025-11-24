import React from 'react';
import { MOCK_MATERIALS } from '../constants';
import { AlertCircle, CheckCircle, Plus, Minus } from 'lucide-react';

export const Inventory: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex justify-between items-center border-b border-gray-200 pb-4">
            <div>
            <h2 className="text-3xl font-bold text-[#1A1A1A]">Inventario Central</h2>
            <p className="text-[#666666] mt-1">Control de existencias y alertas de reabastecimiento.</p>
            </div>
            <button className="bg-[#FFB800] text-[#1A1A1A] px-5 py-2.5 rounded-lg hover:bg-[#E5A600] shadow-md flex items-center font-bold transition-colors">
                <Plus className="w-5 h-5 mr-2" /> Nuevo Material
            </button>
        </header>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-100 text-[#666666] font-bold text-xs uppercase tracking-wider">
                    <tr>
                        <th className="px-6 py-4">SKU / Material</th>
                        <th className="px-6 py-4">Categoría</th>
                        <th className="px-6 py-4 text-center">Stock Actual</th>
                        <th className="px-6 py-4 text-center">Mínimo</th>
                        <th className="px-6 py-4">Estado</th>
                        <th className="px-6 py-4 text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {MOCK_MATERIALS.map((material) => {
                        const isLowStock = material.currentStock <= material.minStock;
                        return (
                            <tr key={material.id} className="hover:bg-yellow-50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="font-bold text-[#1A1A1A]">{material.name}</div>
                                    <div className="text-xs text-gray-400 uppercase mt-0.5">ID: {material.id}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                                        {material.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`font-mono text-lg font-bold ${isLowStock ? 'text-red-600' : 'text-[#1A1A1A]'}`}>
                                        {material.currentStock}
                                    </span>
                                    <span className="text-xs text-gray-500 ml-1">{material.unit}</span>
                                </td>
                                <td className="px-6 py-4 text-center text-[#666666]">
                                    {material.minStock}
                                </td>
                                <td className="px-6 py-4">
                                    {isLowStock ? (
                                        <div className="flex items-center text-red-600 text-sm font-bold">
                                            <AlertCircle className="w-4 h-4 mr-1.5" /> Stock Bajo
                                        </div>
                                    ) : (
                                        <div className="flex items-center text-emerald-600 text-sm font-bold">
                                            <CheckCircle className="w-4 h-4 mr-1.5" /> Óptimo
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-1.5 text-gray-400 hover:text-[#1A1A1A] hover:bg-[#FFB800] rounded transition-colors">
                                            <Plus className="w-5 h-5" />
                                        </button>
                                        <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                                            <Minus className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    </div>
  );
};