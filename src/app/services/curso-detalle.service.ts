import { Injectable, signal, computed } from '@angular/core';
import { CursoDetalle } from '../models/curso-detalle.model';
import { CURSOS_DETALLE_MOCK } from '../mocks/curso-detalle.mock';
import { CursoService } from './curso.service';
import { ProfesorService } from './profesor.service';
import { EstudianteService } from './estudiante.service';

@Injectable({
  providedIn: 'root'
})
export class CursoDetalleService {
  private cursosDetalle = signal<CursoDetalle[]>(CURSOS_DETALLE_MOCK);

  constructor(
    private cursoService: CursoService,
    private profesorService: ProfesorService,
    private estudianteService: EstudianteService
  ) { }

  getCursosDetalle() {
    return this.cursosDetalle;
  }

  getCursoDetalleById(cursoId: number) {
    return computed(() => this.cursosDetalle().find(detalle => detalle.curso.id === cursoId));
  }

  // Computed signal que combina datos de otros servicios para detalles actualizados
  getCursosDetalleActualizados = computed(() => {
    const cursos = this.cursoService.getCursos()();
    const profesores = this.profesorService.getProfesores()();
    const estudiantes = this.estudianteService.getEstudiantes()();

    return cursos.map(curso => {
      // Asumiendo que el profesor está asignado por curso.id (simplificación)
      // En una app real, habría una tabla de asignaciones profesor-curso
      const profesor = profesores.find(p => p.id === curso.id) || profesores[0];
      const cursoEstudiantes = estudiantes.filter(e => e.cursoId === curso.id);
      return {
        curso,
        profesor,
        estudiantes: cursoEstudiantes
      };
    });
  });
}