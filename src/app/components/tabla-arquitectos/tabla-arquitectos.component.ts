import { Component } from '@angular/core';
import { Arquitecto } from '../../models/arquitecto.model';
import { ArquitectosService } from '../../services/arquitectos.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tabla-arquitectos',
  standalone: true,
  imports: [TableModule, ButtonModule, DropdownModule, FormsModule, ReactiveFormsModule],
  templateUrl: './tabla-arquitectos.component.html',
  styleUrls: ['./tabla-arquitectos.component.scss']
})
export class TablaArquitectosComponent {

  arquitectos: Arquitecto[] = [];
  filteredArquitectos: Arquitecto[] = [];

  dateRanges = [
    { label: 'Últimos 7 días', value: 'last7days' },
    { label: 'Este mes', value: 'thisMonth' },
    { label: 'Año actual', value: 'thisYear' },
  ];
  statuses = [
    { label: 'Activo', value: 'active' },
    { label: 'Inactivo', value: 'inactive' },
    { label: 'Suspendido', value: 'suspended' },
  ];
  collegiateNumbers = [
    { label: '1000 - 1999', value: '1000-1999' },
    { label: '2000 - 2999', value: '2000-2999' },
    { label: '3000 - 3999', value: '3000-3999' },
  ];
  
  selectedDateRange: string | null = null;
  selectedStatus: string | null = null;
  selectedCollegiateNumber: string | null = null;
  globalSearchQuery = '';

  constructor(private arquitectoService: ArquitectosService) { }

  ngOnInit() {
    this.arquitectoService.getArquitectos().subscribe(arquitectos => {
      this.arquitectos = arquitectos;
      this.filteredArquitectos = [...this.arquitectos];
      this.filterTable(); // Aplicar filtros después de obtener los datos
    });
  }

  // Acciones
  verDetalle(arquitecto: Arquitecto) {
    console.log('Detalle:', arquitecto);
  }

  editar(arquitecto: Arquitecto) {
    console.log('Editar:', arquitecto);
  }

  eliminar(arquitecto: Arquitecto) {
    console.log('Eliminar:', arquitecto);
  }

  filterTable() {
    this.filteredArquitectos = this.arquitectos.filter((arquitecto) => {
      // Filtrar por rango de fechas
      const today = new Date();
      const fechaAlta = arquitecto.fechaAlta ? new Date(arquitecto.fechaAlta) : null;
      if (this.selectedDateRange && fechaAlta) {
        if (this.selectedDateRange === 'last7days' && today.getTime() - fechaAlta.getTime() > 7 * 24 * 60 * 60 * 1000) {
          return false;
        } else if (this.selectedDateRange === 'thisMonth' && today.getMonth() !== fechaAlta.getMonth()) {
          return false;
        } else if (this.selectedDateRange === 'thisYear' && today.getFullYear() !== fechaAlta.getFullYear()) {
          return false;
        }
      }

      // Filtrar por situación colegial
      if (this.selectedStatus && arquitecto.situacionColegial !== this.selectedStatus) {
        return false;
      }

      // Filtrar por número de colegiado
      if (this.selectedCollegiateNumber) {
        const [min, max] = this.selectedCollegiateNumber.split('-').map(Number);
        if (arquitecto.nroCol < min || arquitecto.nroCol > max) {
          return false;
        }
      }

      // Búsqueda global
      if (
        this.globalSearchQuery &&
        !Object.values(arquitecto).some((val) =>
          val && String(val).toLowerCase().includes(this.globalSearchQuery.toLowerCase())
        )
      ) {
        return false;
      }

      return true;
    });
  }

  // trackByArquitecto(index: number, arquitecto: Arquitecto): number {
  //   return arquitecto.nombreCo; // Identificador único
  // }
}