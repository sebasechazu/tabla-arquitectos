import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstudianteService } from '../../services/estudiante.service';
import { CursoService } from '../../services/curso.service';
import { Estudiante } from '../../models/estudiante.model';

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    SelectModule,
  FormsModule,
  ReactiveFormsModule,
  TooltipModule
  ],
  templateUrl: './estudiantes.component.html',
})
export class EstudiantesComponent {
  estudiantes;
  cursos;
  dialogVisible = false;
  editMode = false;
  selectedEstudiante: Estudiante | null = null;
  estudianteForm: FormGroup;
  estados = [
    { label: 'Activo', value: 'Activo' },
    { label: 'Inactivo', value: 'Inactivo' },
    { label: 'Egresado', value: 'Egresado' }
  ];

  constructor(
    private estudianteService: EstudianteService,
    private cursoService: CursoService,
    private fb: FormBuilder
  ) {
    this.estudiantes = this.estudianteService.getEstudiantes();
    this.cursos = this.cursoService.getCursos();
    this.estudianteForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cursoId: [null, Validators.required],
      fechaInscripcion: ['', Validators.required],
      estado: ['', Validators.required]
    });
  }

  openNew() {
    this.editMode = false;
    this.selectedEstudiante = null;
    this.estudianteForm.reset();
    this.dialogVisible = true;
  }

  editEstudiante(estudiante: Estudiante) {
    this.editMode = true;
    this.selectedEstudiante = estudiante;
    this.estudianteForm.setValue({
      nombre: estudiante.nombre,
      email: estudiante.email,
      cursoId: estudiante.cursoId,
      fechaInscripcion: estudiante.fechaInscripcion,
      estado: estudiante.estado
    });
    this.dialogVisible = true;
  }

  saveEstudiante() {
    if (this.estudianteForm.invalid) return;
    const formValue = this.estudianteForm.value;
    if (this.editMode && this.selectedEstudiante) {
      this.estudianteService.updateEstudiante(this.selectedEstudiante.id, formValue);
    } else {
      this.estudianteService.addEstudiante(formValue);
    }
    this.dialogVisible = false;
  }

  deleteEstudiante(estudiante: Estudiante) {
    this.estudianteService.deleteEstudiante(estudiante.id);
  }

  closeDialog() {
    this.dialogVisible = false;
  }
  getCursoNombre(cursoId: number): string {
    const cursosArr = this.cursos?.() ?? [];
    const curso = cursosArr.find((c: any) => c.id === cursoId);
    return curso ? curso.nombre : '-';
  }


}
