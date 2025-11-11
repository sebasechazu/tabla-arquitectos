import { Injectable, signal, computed } from '@angular/core';
import { Curso } from '../models/curso.model';
import { CURSOS_MOCK } from '../mocks/curso.mock';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private cursos = signal<Curso[]>(CURSOS_MOCK);

  constructor() { }

  getCursos() {
    return this.cursos;
  }

  getCursoById(id: number) {
    return computed(() => this.cursos().find(curso => curso.id === id));
  }

  addCurso(curso: Omit<Curso, 'id'>): Curso {
    const newId = Math.max(...this.cursos().map(c => c.id)) + 1;
    const newCurso: Curso = { ...curso, id: newId };
    this.cursos.update(cursos => [...cursos, newCurso]);
    return newCurso;
  }

  updateCurso(id: number, updates: Partial<Curso>): Curso | null {
    const currentCursos = this.cursos();
    const index = currentCursos.findIndex(c => c.id === id);
    if (index === -1) return null;

    const updatedCurso = { ...currentCursos[index], ...updates };
    this.cursos.update(cursos => {
      const newCursos = [...cursos];
      newCursos[index] = updatedCurso;
      return newCursos;
    });
    return updatedCurso;
  }

  deleteCurso(id: number): boolean {
    const currentCursos = this.cursos();
    const filteredCursos = currentCursos.filter(c => c.id !== id);
    if (filteredCursos.length === currentCursos.length) return false;

    this.cursos.set(filteredCursos);
    return true;
  }
}