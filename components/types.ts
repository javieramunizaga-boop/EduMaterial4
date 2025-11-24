export enum Zone {
  NORTE = 'Norte',
  CENTRO = 'Centro',
  SUR = 'Sur',
  AUSTRAL = 'Austral'
}

export enum Category {
  CONSUMIBLE = 'Consumible',
  EQUIPO = 'Equipo',
  EPP = 'EPP',
  PAPELERIA = 'Papelería'
}

export interface Supplier {
  id: string;
  name: string;
  zone: Zone;
  rating: number;
  // Expanded fields
  category?: string; // Foco
  contactPerson?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  suppliedCourses?: string[]; // New field: Courses associated with this supplier
}

export interface Material {
  id: string;
  name: string;
  category: Category;
  unit: string;
  currentStock: number;
  minStock: number;
  basePrice: number; // Precio base promedio
}

export interface CourseMaterial {
  materialId: string;
  quantityPerStudent: number;
  isShared?: boolean; // Si es compartido por grupo, no por estudiante
}

export interface Course {
  id: string;
  name: string;
  description: string;
  materials: CourseMaterial[];
}

export interface QuoteItem {
  materialId: string;
  quantity: number;
  unitPrice: number;
  supplierId: string;
}

export interface Quote {
  id: string;
  clientName: string;
  courseId: string;
  participants: number;
  zone: Zone;
  items: QuoteItem[];
  totalCost: number;
  createdAt: Date;
  status: 'Draft' | 'Sent' | 'Approved';
}