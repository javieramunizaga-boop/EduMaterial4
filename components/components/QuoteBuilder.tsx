import React, { useState, useMemo } from 'react';
import { Course, Zone } from '../types';
import { MOCK_COURSES, MOCK_MATERIALS, MOCK_SUPPLIERS, MOCK_LOCATIONS } from '../constants';
import { Calculator, Download, Send, MapPin, Users, Search, Map, Navigation, Truck } from 'lucide-react';

export const QuoteBuilder: React.FC = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [participants, setParticipants] = useState<number>(15);
  const [selectedZone, setSelectedZone] = useState<Zone>(Zone.CENTRO);
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedCommune, setSelectedCommune] = useState<string>('');
  const [selectedSupplierId, setSelectedSupplierId] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [quoteGenerated, setQuoteGenerated] = useState(false);

  const selectedCourse = MOCK_COURSES.find(c => c.id === selectedCourseId);

  // Get available regions based on selected zone
  const availableRegions = useMemo(() => {
    return MOCK_LOCATIONS[selectedZone] || [];
  }, [selectedZone]);

  // Get available communes based on selected region
  const availableCommunes = useMemo(() => {
    const regionData = availableRegions.find(r => r.region === selectedRegion);
    return regionData ? regionData.communes : [];
  }, [availableRegions, selectedRegion]);

  // Get available suppliers based on selected zone
  const availableSuppliers = useMemo(() => {
    return MOCK_SUPPLIERS.filter(s => s.zone === selectedZone);
  }, [selectedZone]);

  const calculatedItems = useMemo(() => {
    if (!selectedCourse) return [];
    
    return selectedCourse.materials.map(cm => {
      const material = MOCK_MATERIALS.find(m => m.id === cm.materialId);
      if (!material) return null;
      
      // Logic: If shared, quantity is fixed (or handled differently), otherwise multiplied by students
      const totalQty = cm.isShared ? cm.quantityPerStudent : cm.quantityPerStudent * participants;
      
      // Find best supplier in zone (simple mock logic: random price variance based on zone)
      // Zona extrema (Norte o Austral) suele ser mas cara
      const zoneMultiplier = (selectedZone === Zone.NORTE || selectedZone === Zone.AUSTRAL) ? 1.15 : 1.0;
      const estimatedPrice = material.basePrice * zoneMultiplier;
      
      // Use selected supplier if set, otherwise find default in zone
      const specificSupplier = MOCK_SUPPLIERS.find(s => s.id === selectedSupplierId);
      const defaultSupplier = MOCK_SUPPLIERS.find(s => s.zone === selectedZone) || MOCK_SUPPLIERS[0];
      const supplier = specificSupplier || defaultSupplier;

      return {
        material,
        totalQty,
        unitPrice: estimatedPrice,
        totalPrice: totalQty * estimatedPrice,
        supplier
      };
    }).filter(Boolean) as any[];
  }, [selectedCourse, participants, selectedZone, selectedSupplierId]);

  const totalCost = calculatedItems.reduce((acc, item) => acc + item.totalPrice, 0);
  const costPerParticipant = participants > 0 ? totalCost / participants : 0;

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setQuoteGenerated(true);
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-8 flex justify-between items-center border-b border-gray-200 pb-4">
        <div>
          <h2 className="text-3xl font-bold text-[#1A1A1A]">Generador de Cotizaciones</h2>
          <p className="text-[#666666] mt-1">Calcula costos precisos basados en listas de materiales estándar.</p>
        </div>
        {quoteGenerated && (
            <button className="flex items-center bg-[#1A1A1A] text-white px-5 py-2.5 rounded-lg hover:bg-[#333333] shadow-md transition-colors font-medium">
                <Download className="w-4 h-4 mr-2" /> Exportar PDF
            </button>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Configuration Panel */}
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-6 flex items-center text-[#1A1A1A]">
                    <Calculator className="w-5 h-5 mr-2 text-[#FFB800]" />
                    Parámetros
                </h3>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-[#666666] mb-1">Curso</label>
                        <select 
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
                            value={selectedCourseId}
                            onChange={(e) => {
                                setSelectedCourseId(e.target.value);
                                setQuoteGenerated(false);
                            }}
                        >
                            <option value="">Seleccionar curso...</option>
                            {MOCK_COURSES.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-[#666666] mb-1">Participantes</label>
                        <div className="relative">
                            <Users className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                            <input 
                                type="number" 
                                min="1"
                                className="w-full pl-10 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
                                value={participants}
                                onChange={(e) => setParticipants(parseInt(e.target.value) || 0)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-[#666666] mb-1">Zona Geográfica</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                            <select 
                                className="w-full pl-10 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
                                value={selectedZone}
                                onChange={(e) => {
                                    setSelectedZone(e.target.value as Zone);
                                    setSelectedRegion('');
                                    setSelectedCommune('');
                                    setSelectedSupplierId('');
                                    setQuoteGenerated(false);
                                }}
                            >
                                {Object.values(Zone).map(z => (
                                    <option key={z} value={z}>{z}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className={!availableRegions.length ? 'opacity-50' : ''}>
                        <label className="block text-sm font-bold text-[#666666] mb-1">Región</label>
                        <div className="relative">
                            <Map className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                            <select 
                                className="w-full pl-10 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
                                value={selectedRegion}
                                onChange={(e) => {
                                    setSelectedRegion(e.target.value);
                                    setSelectedCommune('');
                                }}
                                disabled={!availableRegions.length}
                            >
                                <option value="">Seleccionar región...</option>
                                {availableRegions.map(r => (
                                    <option key={r.region} value={r.region}>{r.region}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className={!availableCommunes.length ? 'opacity-50' : ''}>
                        <label className="block text-sm font-bold text-[#666666] mb-1">Comuna</label>
                        <div className="relative">
                            <Navigation className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                            <select 
                                className="w-full pl-10 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
                                value={selectedCommune}
                                onChange={(e) => setSelectedCommune(e.target.value)}
                                disabled={!availableCommunes.length}
                            >
                                <option value="">Seleccionar comuna...</option>
                                {availableCommunes.map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-bold text-[#666666] mb-1">Proveedor Preferente</label>
                        <div className="relative">
                            <Truck className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                            <select 
                                className="w-full pl-10 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
                                value={selectedSupplierId}
                                onChange={(e) => {
                                    setSelectedSupplierId(e.target.value);
                                    setQuoteGenerated(false);
                                }}
                            >
                                <option value="">Automático (Mejor Opción)</option>
                                {availableSuppliers.map(s => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                ))}
                            </select>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                            {availableSuppliers.length === 0 ? 'No hay proveedores en esta zona' : 'Filtra los costos por proveedor'}
                        </p>
                    </div>

                    <button 
                        className={`w-full py-3 rounded-lg font-bold text-[#1A1A1A] shadow-sm transition-all ${
                            selectedCourseId 
                            ? 'bg-[#FFB800] hover:bg-[#E5A600] shadow-md transform hover:-translate-y-0.5' 
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                        disabled={!selectedCourseId}
                        onClick={handleGenerate}
                    >
                        {isGenerating ? 'Calculando...' : 'Calcular Costos'}
                    </button>
                </div>
            </div>

            {/* Summary Card */}
            {selectedCourse && (
                <div className="bg-[#1A1A1A] text-white p-6 rounded-xl shadow-lg border-t-4 border-[#FFB800]">
                    <h4 className="text-[#FFB800] text-xs font-bold uppercase tracking-wider mb-4">Resumen Estimado</h4>
                    <div className="space-y-4">
                        <div className="flex justify-between items-end border-b border-gray-800 pb-2">
                            <span className="text-gray-300">Costo Total</span>
                            <span className="text-2xl font-bold text-white">
                                {totalCost.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                            </span>
                        </div>
                        <div className="flex justify-between items-end">
                            <span className="text-gray-300">Por Participante</span>
                            <span className="text-xl font-semibold text-[#FFB800]">
                                {costPerParticipant.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                            </span>
                        </div>
                    </div>
                    <div className="mt-6 text-xs text-gray-500">
                        *Precios estimados basados en proveedores de zona {selectedZone}{selectedRegion ? `, ${selectedRegion}` : ''}. Sujetos a cambio.
                    </div>
                </div>
            )}
        </div>

        {/* Detailed BOM Table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-[#1A1A1A]">Desglose de Materiales (BOM)</h3>
                <span className="text-xs px-3 py-1 bg-[#1A1A1A] text-[#FFB800] rounded-full font-bold">
                   {calculatedItems.length} Items
                </span>
            </div>
            
            <div className="overflow-x-auto flex-1">
                {!selectedCourse ? (
                    <div className="h-64 flex flex-col items-center justify-center text-gray-400">
                        <Search className="w-12 h-12 mb-4 opacity-20" />
                        <p>Selecciona un curso para ver la lista de materiales.</p>
                    </div>
                ) : (
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-100 text-[#666666] font-bold uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3">Material</th>
                                <th className="px-6 py-3 text-center">Cat.</th>
                                <th className="px-6 py-3 text-center">Cant.</th>
                                <th className="px-6 py-3 text-right">P. Unit</th>
                                <th className="px-6 py-3 text-right">Total</th>
                                <th className="px-6 py-3">Proveedor Sugerido</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {calculatedItems.map((item, idx) => (
                                <tr key={idx} className="hover:bg-yellow-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-[#1A1A1A]">
                                        {item.material.name}
                                        <span className="block text-xs text-[#666666] font-normal mt-0.5">
                                            {item.material.unit}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2 py-1 rounded text-xs font-medium border ${
                                            item.material.category === 'EPP' ? 'bg-orange-50 text-orange-800 border-orange-100' :
                                            item.material.category === 'Consumible' ? 'bg-blue-50 text-blue-800 border-blue-100' :
                                            'bg-gray-50 text-gray-600 border-gray-200'
                                        }`}>
                                            {item.material.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center font-mono text-[#666666]">
                                        {item.totalQty}
                                    </td>
                                    <td className="px-6 py-4 text-right text-[#666666]">
                                        {item.unitPrice.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                                    </td>
                                    <td className="px-6 py-4 text-right font-bold text-[#1A1A1A]">
                                        {item.totalPrice.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                                    </td>
                                    <td className="px-6 py-4 text-xs text-[#666666]">
                                        <div className="flex items-center">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#FFB800] mr-2"></div>
                                            {item.supplier.name}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            
            {quoteGenerated && (
                <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
                    <button className="text-[#666666] hover:text-[#1A1A1A] px-4 py-2 text-sm font-medium transition-colors">
                        Guardar Borrador
                    </button>
                    <button className="bg-[#1A1A1A] text-white px-6 py-2 rounded-lg hover:bg-[#333333] shadow-md transition-colors flex items-center font-medium">
                        <Send className="w-4 h-4 mr-2" /> Enviar a Administración
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};