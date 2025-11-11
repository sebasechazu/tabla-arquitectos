import { Component, Input } from '@angular/core';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';
import { CursoDetalle } from '../../models/curso-detalle.model';

@Component({
  selector: 'app-curso-detalle',
  standalone: true,
  imports: [ ChipModule, TagModule],
  templateUrl: './curso-detalle.component.html',
})
export class CursoDetalleComponent {
  @Input() detalle!: CursoDetalle | null;

  getNivelColor(nivel: string): 'info' | 'warn' | 'danger' | undefined {
    switch (nivel) {
      case 'Básico': return 'info';
      case 'Intermedio': return 'warn';
      case 'Avanzado': return 'danger';
      default: return undefined;
    }
  }
}
