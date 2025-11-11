import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Curso } from '../../models/curso.model';
import { CursoService } from '../../services/curso.service';

import { CursoDetalleService } from '../../services/curso-detalle.service';
import { CursoDetalleComponent } from '../curso-detalle/curso-detalle.component';
import { CursoDetalle } from '../../models/curso-detalle.model';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    SelectModule,
    InputNumberModule,
    FormsModule,
    ReactiveFormsModule,
  CursoDetalleComponent,
  TooltipModule
  ],
  templateUrl: './cursos.component.html',
})
export class CursosComponent {
  cursos;
  dialogVisible = false;
  editMode = false;
  selectedCurso: Curso | null = null;
  cursoForm: FormGroup;
  niveles = [
    { label: 'Básico', value: 'Básico' },
    { label: 'Intermedio', value: 'Intermedio' },
    { label: 'Avanzado', value: 'Avanzado' }
  ];

  detalleDialogVisible = false;
  detalleCurso: CursoDetalle | null = null;

  constructor(
    private cursoService: CursoService,
    private fb: FormBuilder,
    private cursoDetalleService: CursoDetalleService
  ) {
    this.cursos = this.cursoService.getCursos();
    this.cursoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      duracion: ['', Validators.required],
      nivel: ['', Validators.required],
      alumnos: [0, [Validators.required, Validators.min(0)]],
      activo: [true]
    });
  }

  openNew() {
    this.editMode = false;
    this.selectedCurso = null;
    this.cursoForm.reset({ activo: true, alumnos: 0 });
    this.dialogVisible = true;
  }

  editCurso(curso: Curso) {
    this.editMode = true;
    this.selectedCurso = curso;
    this.cursoForm.setValue({
      nombre: curso.nombre,
      descripcion: curso.descripcion || '',
      duracion: curso.duracion,
      nivel: curso.nivel,
      alumnos: curso.alumnos,
      activo: curso.activo
    });
    this.dialogVisible = true;
  }

  saveCurso() {
    if (this.cursoForm.invalid) return;
    const formValue = this.cursoForm.value;
    if (this.editMode && this.selectedCurso) {
      this.cursoService.updateCurso(this.selectedCurso.id, formValue);
    } else {
      this.cursoService.addCurso(formValue);
    }
    this.dialogVisible = false;
  }

  deleteCurso(curso: Curso) {
    this.cursoService.deleteCurso(curso.id);
  }

  closeDialog() {
    this.dialogVisible = false;
  }

  openDetalle(curso: Curso) {
    const detalleSignal = this.cursoDetalleService.getCursoDetalleById(curso.id);
    const detalle = detalleSignal();
    this.detalleCurso = detalle ?? null;
    this.detalleDialogVisible = true;
  }

  closeDetalleDialog() {
    this.detalleDialogVisible = false;
    this.detalleCurso = null;
  }
}
