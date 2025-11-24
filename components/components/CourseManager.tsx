import React, { useState } from 'react';
import { Sparkles, Plus, Save, Trash2, Loader2 } from 'lucide-react';
import { generateCourseMaterials, GeneratedMaterialItem } from '../services/geminiService';

export const CourseManager: React.FC = () => {
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseDesc, setNewCourseDesc] = useState('');
  const [generatedMaterials, setGeneratedMaterials] = useState<GeneratedMaterialItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAIGenerate = async () => {
    if (!newCourseName || !newCourseDesc) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateCourseMaterials(newCourseName, newCourseDesc);
      setGeneratedMaterials(result);
    } catch (e) {
      setError("No se pudo generar la lista de materiales. Verifica tu conexión o API Key.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8 border-b border-gray-200 pb-4">
        <h2 className="text-3xl font-bold text-[#1A1A1A]">Gestión de Cursos y Estándares</h2>
        <p className="text-[#666666] mt-1">Crea nuevos cursos y deja que la IA sugiera los materiales necesarios.</p>
      </header>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 bg-gray-50 border-b border-gray-200">
            <h3 className="font-bold text-[#1A1A1A] flex items-center text-lg">
                <div className="bg-[#FFB800] p-1 rounded mr-3 text-[#1A1A1A]">
                   <Plus className="w-5 h-5" />
                </div>
                Crear Nuevo Estándar de Curso
            </h3>
        </div>

        <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 gap-6">
                <div>
                    <label className="block text-sm font-bold text-[#666666] mb-1">Nombre del Curso</label>
                    <input 
                        type="text" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
                        placeholder="Ej. Mantenimiento de Motores Diesel"
                        value={newCourseName}
                        onChange={(e) => setNewCourseName(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-[#666666] mb-1">Descripción / Temario Breve</label>
                    <textarea 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFB800] focus:border-[#FFB800] outline-none h-24"
                        placeholder="Describe los objetivos prácticos para que la IA sugiera mejor los materiales..."
                        value={newCourseDesc}
                        onChange={(e) => setNewCourseDesc(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <p className="text-sm text-[#666666]">
                    La IA generará una lista preliminar de materiales por alumno.
                </p>
                <button 
                    onClick={handleAIGenerate}
                    disabled={isLoading || !newCourseName}
                    className="bg-[#FFB800] text-[#1A1A1A] px-6 py-3 rounded-lg hover:bg-[#E5A600] shadow-md transition-all flex items-center disabled:opacity-50 disabled:cursor-not-allowed font-bold"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Pensando...
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-4 h-4 mr-2" /> Sugerir Materiales con IA
                        </>
                    )}
                </button>
            </div>
        </div>

        {error && (
            <div className="bg-red-50 text-red-700 p-4 text-sm border-t border-red-100">
                {error}
            </div>
        )}

        {generatedMaterials.length > 0 && (
            <div className="border-t border-gray-200">
                <div className="p-4 bg-gray-50 flex justify-between items-center border-b border-gray-200">
                    <h4 className="font-bold text-[#1A1A1A] text-sm">Materiales Sugeridos ({generatedMaterials.length})</h4>
                </div>
                <table className="w-full text-sm text-left">
                    <thead className="bg-white text-[#666666] font-medium border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-3">Material</th>
                            <th className="px-6 py-3">Categoría</th>
                            <th className="px-6 py-3 text-center">Cant. / Alumno</th>
                            <th className="px-6 py-3">Justificación IA</th>
                            <th className="px-6 py-3 text-right">Acción</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                        {generatedMaterials.map((item, idx) => (
                            <tr key={idx} className="hover:bg-yellow-50">
                                <td className="px-6 py-3 font-medium text-[#1A1A1A]">{item.name}</td>
                                <td className="px-6 py-3">
                                    <span className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-600 border border-gray-200">
                                        {item.category}
                                    </span>
                                </td>
                                <td className="px-6 py-3 text-center">
                                    {item.quantityPerStudent} <span className="text-xs text-gray-400">{item.unit}</span>
                                </td>
                                <td className="px-6 py-3 text-xs text-gray-500 max-w-xs truncate" title={item.reasoning}>
                                    {item.reasoning}
                                </td>
                                <td className="px-6 py-3 text-right">
                                    <button className="text-red-400 hover:text-red-600">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="p-6 bg-gray-50 flex justify-end border-t border-gray-200">
                    <button className="bg-[#1A1A1A] text-white px-6 py-2.5 rounded-lg hover:bg-[#333333] shadow-md transition-colors flex items-center font-bold">
                        <Save className="w-4 h-4 mr-2" /> Guardar Curso
                    </button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};