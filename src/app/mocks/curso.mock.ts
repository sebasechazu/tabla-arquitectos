import { Curso } from '../models/curso.model';

export const CURSOS_MOCK: Curso[] = [
  {
    id: 1,
    nombre: 'Introducción a Angular',
    descripcion: 'Curso básico para aprender los fundamentos de Angular',
    duracion: '6 semanas',
    nivel: 'Básico',
    alumnos: 25,
    activo: true
  },
  {
    id: 2,
    nombre: 'Desarrollo Avanzado con Angular',
    descripcion: 'Técnicas avanzadas para aplicaciones complejas',
    duracion: '8 semanas',
    nivel: 'Avanzado',
    alumnos: 15,
    activo: true
  },
  {
    id: 3,
    nombre: 'TypeScript para Angular',
    descripcion: 'Mejora tus habilidades en TypeScript',
    duracion: '4 semanas',
    nivel: 'Intermedio',
    alumnos: 30,
    activo: false
  }
];