import React, { useState } from 'react';
import { MOCK_SUPPLIERS } from '../constants';
import { Supplier, Zone } from '../types';
import { Search, Plus, MapPin, Phone, Mail, User, Star, Building, BookOpen } from 'lucide-react';

export const SupplierManager: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>(MOCK_SUPPLIERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newCoursesInput, setNewCoursesInput] = useState('');
  
  // Form State
  const [newSupplier, setNewSupplier] = useState<Partial<Supplier>>({
    name: '',
    zone: Zone.CENTRO,
    rating: 5.0,
    category: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    contactPerson: '',
    suppliedCourses: []
  });

  const filteredSuppliers = suppliers.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = () => {
    if (newSupplier.name) {
      const coursesList = newCoursesInput.split(',').map(c => c.trim()).filter(c => c !== '');
      
      const supplier: Supplier = {
        id: `new_${Date.now()}`,
        name: newSupplier.name,
        zone: newSupplier.zone as Zone,
        rating: newSupplier.rating || 0,
        category: newSupplier.category,
        email: newSupplier.email,
        phone: newSupplier.phone,
        address: newSupplier.address,
        city: newSupplier.city,
        contactPerson: newSupplier.contactPerson,
        suppliedCourses: coursesList
      };
      setSuppliers([...suppliers, supplier]);
      setIsAdding(false);
      setNewSupplier({
        name: '',
        zone: Zone.CENTRO,
        rating: 5.0,
        category: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        contactPerson: '',
        suppliedCourses: []
      });
      setNewCoursesInput('');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-8 flex justify-between items-center border-b border-gray-200 pb-4">
        <div>
          <h2 className="text-3xl font-bold text-[#1A1A1A]">Gestión de Proveedores</h2>
          <p className="text-[#666666] mt-1">Directorio de proveedores por zona, especialidad y contacto.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="bg-[#FFB800] text-[#1A1A1A] px-4 py-2 rounded-lg hover:bg-[#E5A600] shadow-md flex items-center font-bold transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" /> Nuevo Proveedor
          </button>
        </div>
      </header>

      {isAdding && (
        <div className="mb-8 bg-white p-6 rounded-xl shadow-md border-l-4 border-[#FFB800]">
          <h3 className="font-bold text-[#1A1A1A] mb-4 text-lg">Registrar Nuevo Proveedor</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" placeholder="Razón Social / Nombre"
              className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFB800] outline-none"
              value={newSupplier.name}
              onChange={e => setNewSupplier({...newSupplier, name: e.target.value})}
            />
              <input 
              type="text" placeholder="Foco / Categoría (ej. Eléctrico)"
              className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFB800] outline-none"
              value={newSupplier.category}
              onChange={e => setNewSupplier({...newSupplier, category: e.target.value})}
            />
            <select 
              className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFB800] outline-none"
              value={newSupplier.zone}
              onChange={e => setNewSupplier({...newSupplier, zone: e.target.value as Zone})}
            >
                {Object.values(Zone).map(z => <option key={z} value={z}>{z}</option>)}
            </select>
            <input 
              type="text" placeholder="Ciudad"
              className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFB800] outline-none"
              value={newSupplier.city}
              onChange={e => setNewSupplier({...newSupplier, city: e.target.value})}
            />
            <input 
              type="text" placeholder="Dirección"
              className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFB800] outline-none"
              value={newSupplier.address}
              onChange={e => setNewSupplier({...newSupplier, address: e.target.value})}
            />
            <input 
              type="text" placeholder="Persona de Contacto"
              className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFB800] outline-none"
              value={newSupplier.contactPerson}
              onChange={e => setNewSupplier({...newSupplier, contactPerson: e.target.value})}
            />
            <input 
              type="email" placeholder="Email"
              className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFB800] outline-none"
              value={newSupplier.email}
              onChange={e => setNewSupplier({...newSupplier, email: e.target.value})}
            />
            <input 
              type="text" placeholder="Teléfono"
              className="p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFB800] outline-none"
              value={newSupplier.phone}
              onChange={e => setNewSupplier({...newSupplier, phone: e.target.value})}
            />
            <div className="md:col-span-2">
              <input 
                type="text" placeholder="Cursos provistos (separados por coma)"
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFB800] outline-none"
                value={newCoursesInput}
                onChange={e => setNewCoursesInput(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Ej: Técnicas de soldadura, Instalador Eléctrico</p>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button 
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-[#666666] hover:bg-gray-100 rounded-lg font-medium"
            >
              Cancelar
            </button>
            <button 
              onClick={handleSave}
              disabled={!newSupplier.name}
              className="px-6 py-2 bg-[#FFB800] text-[#1A1A1A] rounded-lg hover:bg-[#E5A600] font-bold shadow-sm"
            >
              Guardar Proveedor
            </button>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
        <input 
          type="text"
          placeholder="Buscar por nombre, ciudad, especialidad o curso..."
          className="w-full pl-10 p-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FFB800] focus:border-[#FFB800] outline-none shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuppliers.map(supplier => (
          <div key={supplier.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
            <div className="p-5 flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-[#1A1A1A] truncate" title={supplier.name}>{supplier.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full font-bold border ${
                  supplier.zone === Zone.NORTE ? 'bg-amber-50 text-amber-800 border-amber-100' :
                  supplier.zone === Zone.CENTRO ? 'bg-blue-50 text-blue-800 border-blue-100' :
                  supplier.zone === Zone.SUR ? 'bg-emerald-50 text-emerald-800 border-emerald-100' :
                  'bg-purple-50 text-purple-800 border-purple-100'
                }`}>
                  {supplier.zone}
                </span>
              </div>
              
              <div className="flex items-center text-sm text-[#666666] mb-4">
                <Building className="w-4 h-4 mr-1.5 text-[#FFB800]" />
                <span className="truncate font-medium">{supplier.category || 'General'}</span>
              </div>

              <div className="space-y-2 text-sm border-t border-gray-100 pt-4">
                {supplier.city && (
                  <div className="flex items-start text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
                    <span>{supplier.address ? `${supplier.address}, ` : ''}{supplier.city}</span>
                  </div>
                )}
                {supplier.contactPerson && (
                  <div className="flex items-center text-gray-600">
                    <User className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                    <span>{supplier.contactPerson}</span>
                  </div>
                )}
                {supplier.phone && (
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                    <span>{supplier.phone}</span>
                  </div>
                )}
                {supplier.email && (
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                    <a href={`mailto:${supplier.email}`} className="text-blue-600 hover:underline truncate block">
                      {supplier.email}
                    </a>
                  </div>
                )}
              </div>

              {supplier.suppliedCourses && supplier.suppliedCourses.length > 0 && (
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <div className="flex items-center text-xs font-bold text-[#1A1A1A] mb-2">
                    <BookOpen className="w-3 h-3 mr-1" />
                    Historial de Cursos
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {supplier.suppliedCourses.map((course, idx) => (
                      <span key={idx} className="inline-block bg-gray-100 text-[#666666] text-[10px] px-2 py-0.5 rounded border border-gray-200 font-medium">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="bg-gray-50 p-3 border-t border-gray-100 flex justify-between items-center">
              <div className="flex items-center text-[#FFB800]">
                <Star className="w-4 h-4 fill-current" />
                <span className="ml-1 font-bold text-[#1A1A1A]">{supplier.rating}</span>
              </div>
              <button className="text-xs font-bold text-[#1A1A1A] hover:text-[#FFB800] transition-colors">
                Ver Detalles
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};