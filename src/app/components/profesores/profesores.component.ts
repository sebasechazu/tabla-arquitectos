import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfesorService } from '../../services/profesor.service';
import { Profesor } from '../../models/profesor.model';

@Component({
  selector: 'app-profesores',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    SelectModule,
  FormsModule,
  ReactiveFormsModule,
  TooltipModule
  ],
  templateUrl: './profesores.component.html',
})
export class ProfesoresComponent {
  profesores;
  dialogVisible = false;
  editMode = false;
  selectedProfesor: Profesor | null = null;
  profesorForm: FormGroup;
  estados = [
    { label: 'Activo', value: true },
    { label: 'Inactivo', value: false }
  ];

  constructor(
    private profesorService: ProfesorService,
    private fb: FormBuilder
  ) {
    this.profesores = this.profesorService.getProfesores();
    this.profesorForm = this.fb.group({
      nombre: ['', Validators.required],
      especialidad: ['', Validators.required],
      cursosAsignados: [0, [Validators.required, Validators.min(0)]],
      experiencia: [0, [Validators.required, Validators.min(0)]],
      activo: [true, Validators.required]
    });
  }

  openNew() {
    this.editMode = false;
    this.selectedProfesor = null;
    this.profesorForm.reset({ activo: true, cursosAsignados: 0, experiencia: 0 });
    this.dialogVisible = true;
  }

  editProfesor(profesor: Profesor) {
    this.editMode = true;
    this.selectedProfesor = profesor;
    this.profesorForm.setValue({
      nombre: profesor.nombre,
      especialidad: profesor.especialidad,
      cursosAsignados: profesor.cursosAsignados,
      experiencia: profesor.experiencia,
      activo: profesor.activo
    });
    this.dialogVisible = true;
  }

  saveProfesor() {
    if (this.profesorForm.invalid) return;
    const formValue = this.profesorForm.value;
    if (this.editMode && this.selectedProfesor) {
      this.profesorService.updateProfesor(this.selectedProfesor.id, formValue);
    } else {
      this.profesorService.addProfesor(formValue);
    }
    this.dialogVisible = false;
  }

  deleteProfesor(profesor: Profesor) {
    this.profesorService.deleteProfesor(profesor.id);
  }

  closeDialog() {
    this.dialogVisible = false;
  }
}
