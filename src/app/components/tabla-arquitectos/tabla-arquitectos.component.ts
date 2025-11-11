import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { Arquitecto } from '../../models/arquitecto.model';
import { ArquitectosService } from '../../services/arquitectos.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { Select } from 'primeng/select';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@Component({
    selector: 'app-tabla-arquitectos',
    standalone: true,
    imports: [
        TableModule,
        ButtonModule,
        DatePicker,
        Select,
        SelectModule,
        FormsModule,
        InputGroupModule,
        InputGroupAddonModule,
        ReactiveFormsModule,
        InputTextModule
    ],
    templateUrl: './tabla-arquitectos.component.html',
})
export class TablaArquitectosComponent implements OnInit {

  protected arquitectos: Arquitecto[] = [];
  protected filteredArquitectos: Arquitecto[] = [];
  protected statuses: { label: string; value: string }[] = [];
  protected startDate: Date | null = null;
  protected endDate: Date | null = null;

  protected rowsPerPage: number = 5;
  protected rowsPerPageOptions: number[] = [5,10, 25];

  protected rowsPerPageSelectOptions: { label: string; value: number }[] = [
    { label: '05', value: 5 },
    { label: '10', value: 10 },
    { label: '25', value: 25 }
  ];

  protected collegiateNumbers = [
    { label: '1000 - 1999', value: '1000-1999' },
    { label: '2000 - 2999', value: '2000-2999' },
    { label: '3000 - 3999', value: '3000-3999' },
  ];

  protected selectedDateRange: string | null = null;
  protected selectedStatus: string | null = null;
  protected selectedCollegiateNumber: string | null = null;
  protected globalSearchQuery = '';

  private arquitectoService = inject(ArquitectosService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.arquitectoService.getArquitectos().subscribe(arquitectos => {
      this.arquitectos = arquitectos;
      this.filteredArquitectos = [...this.arquitectos];

      this.arquitectoService.getStatuses().subscribe((statuses) => {
        this.statuses = statuses;
      });
      this.filterTable();
    });
  }

  protected filterByDateRange(): void {
    this.arquitectoService.filterByDateRange(this.startDate, this.endDate).subscribe((filtered) => {
      this.filteredArquitectos = filtered;
    });
  }

  // Acciones
  protected verDetalle(arquitecto: Arquitecto) {
    console.log('Detalle:', arquitecto);
  }

  protected editar(arquitecto: Arquitecto) {
    console.log('Editar:', arquitecto);
  }

  protected eliminar(arquitecto: Arquitecto) {
    console.log('Eliminar:', arquitecto);
  }

  protected filterTable() {
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

  protected resetFilters(): void {
    this.startDate = null;
    this.endDate = null;
    this.selectedStatus = null;
    this.filteredArquitectos = [...this.arquitectos];
  }
}