import { Estudiante } from '../models/estudiante.model';

export const ESTUDIANTES_MOCK: Estudiante[] = [
  {
    id: 1,
    nombre: 'Juan Pérez',
    email: 'juan.perez@example.com',
    cursoId: 1,
    fechaInscripcion: '2023-09-01',
    estado: 'Activo'
  },
  {
    id: 2,
    nombre: 'María García',
    email: 'maria.garcia@example.com',
    cursoId: 1,
    fechaInscripcion: '2023-09-05',
    estado: 'Activo'
  },
  {
    id: 3,
    nombre: 'Carlos López',
    email: 'carlos.lopez@example.com',
    cursoId: 2,
    fechaInscripcion: '2023-08-15',
    estado: 'Egresado'
  },
  {
    id: 4,
    nombre: 'Ana Rodríguez',
    email: 'ana.rodriguez@example.com',
    cursoId: 2,
    fechaInscripcion: '2023-08-20',
    estado: 'Inactivo'
  }
];