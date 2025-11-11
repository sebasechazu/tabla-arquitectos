import { CursoDetalle } from '../models/curso-detalle.model';
import { CURSOS_MOCK } from './curso.mock';
import { PROFESORES_MOCK } from './profesor.mock';
import { ESTUDIANTES_MOCK } from './estudiante.mock';

export const CURSOS_DETALLE_MOCK: CursoDetalle[] = [
  {
    curso: CURSOS_MOCK[0], // Introducción a Angular
    profesor: PROFESORES_MOCK[0], // Dr. Elena Martínez
    estudiantes: ESTUDIANTES_MOCK.filter(e => e.cursoId === 1) // Estudiantes del curso 1
  },
  {
    curso: CURSOS_MOCK[1], // Desarrollo Avanzado con Angular
    profesor: PROFESORES_MOCK[1], // Prof. Roberto Sánchez
    estudiantes: ESTUDIANTES_MOCK.filter(e => e.cursoId === 2) // Estudiantes del curso 2
  },
  {
    curso: CURSOS_MOCK[2], // TypeScript para Angular
    profesor: PROFESORES_MOCK[2], // Lic. Sofia Fernández
    estudiantes: [] // Sin estudiantes asignados en el mock
  }
];