
import { Course, Material, Supplier, Zone, Category } from './types';

export const MOCK_SUPPLIERS: Supplier[] = [
  // Generic suppliers for other zones to ensure QuoteBuilder works
  { id: 's1', name: 'Ferretería Industrial Santiago', zone: Zone.CENTRO, rating: 4.8, category: 'General', city: 'Santiago', email: 'ventas@ferreteriasantiago.cl', suppliedCourses: ['Electricidad Residencial'] },
  { id: 's2', name: 'Minería & Insumos Norte', zone: Zone.NORTE, rating: 4.5, category: 'Industrial', city: 'Antofagasta', phone: '+56 55 222 3333', suppliedCourses: ['Soldadura Básica SMAW'] },
  { id: 's4', name: 'Proveedores Patagónicos', zone: Zone.AUSTRAL, rating: 4.7, category: 'General', city: 'Punta Arenas' },

  // Proveedores extraídos del PDF (Zona Sur - Biobío)
  { 
    id: 'pdf1', 
    name: 'ELECTROCOM', 
    zone: Zone.SUR, 
    rating: 4.8, 
    category: 'Materiales Eléctricos (Especializado)', 
    address: 'Av. Manuel Rodríguez Nº 551', 
    city: 'Concepción', 
    contactPerson: '', 
    email: 'jarias@electrocom.cl', 
    phone: '(+56) 41 224 4077',
    suppliedCourses: ['Electricidad Residencial', 'Instalador Eléctrico']
  },
  { 
    id: 'pdf2', 
    name: 'Vitel Energía', 
    zone: Zone.SUR, 
    rating: 4.6, 
    category: 'Soluciones Eléctricas (Canalización, Protecciones)', 
    address: 'Av. Cristóbal Colón 9765, Bodega A4', 
    city: 'Concepción/Hualpén', 
    contactPerson: '', 
    email: 'rrojas@vitel.cl', 
    phone: '(+56) 41 333 7136',
    suppliedCourses: ['Instalador Eléctrico']
  },
  { 
    id: 'pdf3', 
    name: 'Aceros y Herramientas Ltda.', 
    zone: Zone.SUR, 
    rating: 4.5, 
    category: 'Herramientas y Soldadura', 
    address: 'Montriou 1410, Barrio Norte', 
    city: 'Concepción', 
    contactPerson: '', 
    email: 'ventas@acerosyherramientas.cl', 
    phone: '(+56) 41 223 4924',
    suppliedCourses: ['Soldadura Básica SMAW']
  },
  { 
    id: 'pdf4', 
    name: 'Gases Bio Bio', 
    zone: Zone.SUR, 
    rating: 4.7, 
    category: 'Insumos de Soldadura (Gases, Electrodos)', 
    address: 'Avda. Las Industrias 2420', 
    city: 'Los Ángeles', 
    contactPerson: '', 
    email: 'gasesbiobio@gmail.com', 
    phone: '(+56) 9 7388 7411',
    suppliedCourses: ['Técnicas de Soldadura']
  },
  { 
    id: 'pdf5', 
    name: 'Servifast Ferretería', 
    zone: Zone.SUR, 
    rating: 4.3, 
    category: 'Ferretería General y Consumibles', 
    address: '', 
    city: 'Concepción', 
    contactPerson: '', 
    email: '', 
    phone: '(+56 9) 4491 858' 
  },
  { 
    id: 'pdf6', 
    name: 'Ferretería Solucenter Arauco', 
    zone: Zone.SUR, 
    rating: 4.9, 
    category: 'Ferretería Industrial (Herramientas, EP)', 
    address: 'Condell 615', 
    city: 'Arauco', 
    contactPerson: 'Carolina Figueroa', 
    email: 'contacto@solucenter.cl', 
    phone: '(+56) 41-330643',
    suppliedCourses: ['Técnicas de Soldadura', 'Instalador Eléctrico']
  },
  { 
    id: 'pdf7', 
    name: 'Ferretería Fedimar', 
    zone: Zone.SUR, 
    rating: 4.4, 
    category: 'Ferretería y Materiales de Construcción', 
    address: 'Cochrane #268', 
    city: 'Arauco', 
    contactPerson: '', 
    email: 'fedimar2013@gmail.com', 
    phone: '(+56) 44 288 2743' 
  },
];

export const MOCK_MATERIALS: Material[] = [
  { id: 'm1', name: 'Electrodo 6013 1/8" (Caja 5kg)', category: Category.CONSUMIBLE, unit: 'caja', currentStock: 50, minStock: 20, basePrice: 18500 },
  { id: 'm2', name: 'Guantes de Carnaza', category: Category.EPP, unit: 'par', currentStock: 15, minStock: 25, basePrice: 4500 },
  { id: 'm3', name: 'Careta para Soldar Fotosensible', category: Category.EQUIPO, unit: 'pza', currentStock: 8, minStock: 10, basePrice: 35000 },
  { id: 'm4', name: 'Manual del Participante (Impreso)', category: Category.PAPELERIA, unit: 'pza', currentStock: 100, minStock: 50, basePrice: 4500 },
  { id: 'm5', name: 'Placa de Acero 10x10cm', category: Category.CONSUMIBLE, unit: 'pza', currentStock: 200, minStock: 100, basePrice: 3200 },
  { id: 'm6', name: 'Lápiz Grafito #2', category: Category.PAPELERIA, unit: 'pza', currentStock: 500, minStock: 100, basePrice: 500 },
  { id: 'm7', name: 'Multímetro Digital Industrial', category: Category.EQUIPO, unit: 'pza', currentStock: 5, minStock: 5, basePrice: 45000 },
  // Nuevos materiales del PDF
  { id: 'm8', name: 'Máquina de Soldar Arco Manual', category: Category.EQUIPO, unit: 'pza', currentStock: 4, minStock: 5, basePrice: 280000 },
  { id: 'm9', name: 'Tronzadora de Metales', category: Category.EQUIPO, unit: 'pza', currentStock: 1, minStock: 1, basePrice: 150000 },
  { id: 'm10', name: 'Esmeril Angular 4.5"', category: Category.EQUIPO, unit: 'pza', currentStock: 6, minStock: 5, basePrice: 42000 },
  { id: 'm11', name: 'Escobilla Metálica', category: Category.EQUIPO, unit: 'pza', currentStock: 20, minStock: 10, basePrice: 2500 },
  { id: 'm12', name: 'Picasal (Picador de escoria)', category: Category.EQUIPO, unit: 'pza', currentStock: 20, minStock: 10, basePrice: 3800 },
  { id: 'm13', name: 'Guantes de Cabritilla', category: Category.EPP, unit: 'par', currentStock: 50, minStock: 20, basePrice: 5500 },
  { id: 'm14', name: 'Guantes Mosqueteros', category: Category.EPP, unit: 'par', currentStock: 50, minStock: 20, basePrice: 6800 },
  { id: 'm15', name: 'Pechera de Cuero', category: Category.EPP, unit: 'pza', currentStock: 15, minStock: 10, basePrice: 12000 },
  { id: 'm16', name: 'Tapones Auditivos', category: Category.EPP, unit: 'par', currentStock: 200, minStock: 50, basePrice: 800 },
  { id: 'm17', name: 'Antiparras de Seguridad', category: Category.EPP, unit: 'par', currentStock: 80, minStock: 30, basePrice: 3500 },
  { id: 'm18', name: 'Electrodo E6011 3/32" (Bolsa 5kg)', category: Category.CONSUMIBLE, unit: 'bolsa', currentStock: 10, minStock: 5, basePrice: 16000 },
  { id: 'm19', name: 'Disco de Corte Fino 4.5"', category: Category.CONSUMIBLE, unit: 'pza', currentStock: 100, minStock: 50, basePrice: 1200 },
  { id: 'm20', name: 'Pletina 38x3mm x 6m', category: Category.CONSUMIBLE, unit: 'tira', currentStock: 10, minStock: 5, basePrice: 14500 },
  { id: 'm21', name: 'Disco de Corte 14"', category: Category.CONSUMIBLE, unit: 'pza', currentStock: 20, minStock: 5, basePrice: 5500 },
  { id: 'm22', name: 'Evaluación Impresa', category: Category.PAPELERIA, unit: 'pza', currentStock: 500, minStock: 50, basePrice: 150 },
];

export const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    name: 'Soldadura Básica SMAW',
    description: 'Curso introductorio a soldadura por arco eléctrico.',
    materials: [
      { materialId: 'm1', quantityPerStudent: 0.2 }, // 20% of a box per student
      { materialId: 'm2', quantityPerStudent: 1 },
      { materialId: 'm4', quantityPerStudent: 1 },
      { materialId: 'm5', quantityPerStudent: 5 },
      { materialId: 'm3', quantityPerStudent: 5, isShared: true }, // 5 shared masks for group
    ]
  },
  {
    id: 'c2',
    name: 'Electricidad Residencial',
    description: 'Fundamentos de instalaciones eléctricas.',
    materials: [
      { materialId: 'm7', quantityPerStudent: 2, isShared: true }, // 2 shared multimeters
      { materialId: 'm4', quantityPerStudent: 1 },
      { materialId: 'm2', quantityPerStudent: 1 },
    ]
  },
  // Nuevo curso importado del PDF
  {
    id: 'c3',
    name: 'Técnicas de Soldadura (Importado PDF)',
    description: 'Curso completo de técnicas de soldadura con lista de materiales importada.',
    materials: [
      // Equipos Compartidos (Calculados para curso de 10 pax en el PDF)
      { materialId: 'm8', quantityPerStudent: 5, isShared: true }, // 5 maquinas total
      { materialId: 'm9', quantityPerStudent: 1, isShared: true }, // 1 tronzadora total
      { materialId: 'm10', quantityPerStudent: 3, isShared: true }, // 3 esmeriles total
      { materialId: 'm11', quantityPerStudent: 5, isShared: true }, // 5 escobillas total
      { materialId: 'm12', quantityPerStudent: 5, isShared: true }, // 5 picasales total
      
      // Individuales
      { materialId: 'm13', quantityPerStudent: 1 }, // Guantes cabritilla
      { materialId: 'm14', quantityPerStudent: 1 }, // Guantes mosqueteros
      { materialId: 'm15', quantityPerStudent: 1 }, // Pechera
      { materialId: 'm16', quantityPerStudent: 1 }, // Tapones
      { materialId: 'm17', quantityPerStudent: 1 }, // Antiparras
      { materialId: 'm3', quantityPerStudent: 1 },  // Careta (usamos la m3 existente o creamos m18 si es diferente)
      
      // Consumibles (Cantidades del PDF)
      { materialId: 'm18', quantityPerStudent: 2, isShared: true }, // 2 Bolsas E6011 Total Curso
      { materialId: 'm1', quantityPerStudent: 2, isShared: true },  // 2 Bolsas E6013 Total Curso (reusing m1 approx)
      { materialId: 'm19', quantityPerStudent: 1 }, // Disco fino (10 para 10 pax)
      { materialId: 'm20', quantityPerStudent: 1 }, // Pletina (10 para 10 pax)
      { materialId: 'm21', quantityPerStudent: 1 }, // Disco 14 (10 para 10 pax)
      { materialId: 'm22', quantityPerStudent: 1 }, // Evaluaciones
    ]
  }
];

export const MOCK_LOCATIONS: Record<Zone, { region: string; communes: string[] }[]> = {
  [Zone.NORTE]: [
    { region: 'Arica y Parinacota', communes: ['Arica', 'Putre'] },
    { region: 'Tarapacá', communes: ['Iquique', 'Alto Hospicio', 'Pozo Almonte'] },
    { region: 'Antofagasta', communes: ['Antofagasta', 'Calama', 'Tocopilla', 'Mejillones'] },
    { region: 'Atacama', communes: ['Copiapó', 'Vallenar', 'Caldera'] },
    { region: 'Coquimbo', communes: ['La Serena', 'Coquimbo', 'Ovalle', 'Illapel'] },
  ],
  [Zone.CENTRO]: [
    { region: 'Valparaíso', communes: ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana', 'San Antonio'] },
    { region: 'Metropolitana', communes: ['Santiago', 'Providencia', 'Las Condes', 'Maipú', 'Puente Alto', 'La Florida'] },
    { region: "O'Higgins", communes: ['Rancagua', 'San Fernando', 'Rengo'] },
    { region: 'Maule', communes: ['Talca', 'Curicó', 'Linares'] },
  ],
  [Zone.SUR]: [
    { region: 'Ñuble', communes: ['Chillán', 'San Carlos'] },
    { region: 'Biobío', communes: ['Concepción', 'Talcahuano', 'Los Ángeles', 'Coronel', 'Hualpén', 'Arauco'] },
    { region: 'La Araucanía', communes: ['Temuco', 'Padre Las Casas', 'Villarrica', 'Pucón'] },
    { region: 'Los Ríos', communes: ['Valdivia', 'La Unión'] },
    { region: 'Los Lagos', communes: ['Puerto Montt', 'Osorno', 'Puerto Varas', 'Castro'] },
  ],
  [Zone.AUSTRAL]: [
    { region: 'Aysén', communes: ['Coyhaique', 'Puerto Aysén'] },
    { region: 'Magallanes', communes: ['Punta Arenas', 'Puerto Natales', 'Porvenir'] },
  ],
};
