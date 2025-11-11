import { Injectable, signal, computed } from '@angular/core';
import { Estudiante } from '../models/estudiante.model';
import { ESTUDIANTES_MOCK } from '../mocks/estudiante.mock';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private estudiantes = signal<Estudiante[]>(ESTUDIANTES_MOCK);

  constructor() { }

  getEstudiantes() {
    return this.estudiantes;
  }

  getEstudianteById(id: number) {
    return computed(() => this.estudiantes().find(estudiante => estudiante.id === id));
  }

  getEstudiantesByCursoId(cursoId: number) {
    return computed(() => this.estudiantes().filter(estudiante => estudiante.cursoId === cursoId));
  }

  addEstudiante(estudiante: Omit<Estudiante, 'id'>): Estudiante {
    const newId = Math.max(...this.estudiantes().map(e => e.id)) + 1;
    const newEstudiante: Estudiante = { ...estudiante, id: newId };
    this.estudiantes.update(estudiantes => [...estudiantes, newEstudiante]);
    return newEstudiante;
  }

  updateEstudiante(id: number, updates: Partial<Estudiante>): Estudiante | null {
    const currentEstudiantes = this.estudiantes();
    const index = currentEstudiantes.findIndex(e => e.id === id);
    if (index === -1) return null;

    const updatedEstudiante = { ...currentEstudiantes[index], ...updates };
    this.estudiantes.update(estudiantes => {
      const newEstudiantes = [...estudiantes];
      newEstudiantes[index] = updatedEstudiante;
      return newEstudiantes;
    });
    return updatedEstudiante;
  }

  deleteEstudiante(id: number): boolean {
    const currentEstudiantes = this.estudiantes();
    const filteredEstudiantes = currentEstudiantes.filter(e => e.id !== id);
    if (filteredEstudiantes.length === currentEstudiantes.length) return false;

    this.estudiantes.set(filteredEstudiantes);
    return true;
  }
}