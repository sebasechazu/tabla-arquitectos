import { Profesor } from '../models/profesor.model';

export const PROFESORES_MOCK: Profesor[] = [
  {
    id: 1,
    nombre: 'Dr. Elena Martínez',
    especialidad: 'Angular',
    cursosAsignados: 2,
    experiencia: 8,
    activo: true
  },
  {
    id: 2,
    nombre: 'Prof. Roberto Sánchez',
    especialidad: 'TypeScript',
    cursosAsignados: 1,
    experiencia: 5,
    activo: true
  },
  {
    id: 3,
    nombre: 'Lic. Sofia Fernández',
    especialidad: 'UX/UI',
    cursosAsignados: 3,
    experiencia: 6,
    activo: false
  }
];