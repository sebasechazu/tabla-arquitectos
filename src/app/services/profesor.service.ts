import { Injectable, signal, computed } from '@angular/core';
import { Profesor } from '../models/profesor.model';
import { PROFESORES_MOCK } from '../mocks/profesor.mock';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  private profesores = signal<Profesor[]>(PROFESORES_MOCK);

  constructor() { }

  getProfesores() {
    return this.profesores;
  }

  getProfesorById(id: number) {
    return computed(() => this.profesores().find(profesor => profesor.id === id));
  }

  addProfesor(profesor: Omit<Profesor, 'id'>): Profesor {
    const newId = Math.max(...this.profesores().map(p => p.id)) + 1;
    const newProfesor: Profesor = { ...profesor, id: newId };
    this.profesores.update(profesores => [...profesores, newProfesor]);
    return newProfesor;
  }

  updateProfesor(id: number, updates: Partial<Profesor>): Profesor | null {
    const currentProfesores = this.profesores();
    const index = currentProfesores.findIndex(p => p.id === id);
    if (index === -1) return null;

    const updatedProfesor = { ...currentProfesores[index], ...updates };
    this.profesores.update(profesores => {
      const newProfesores = [...profesores];
      newProfesores[index] = updatedProfesor;
      return newProfesores;
    });
    return updatedProfesor;
  }

  deleteProfesor(id: number): boolean {
    const currentProfesores = this.profesores();
    const filteredProfesores = currentProfesores.filter(p => p.id !== id);
    if (filteredProfesores.length === currentProfesores.length) return false;

    this.profesores.set(filteredProfesores);
    return true;
  }
}