import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ARQUITECTOS } from '../mocks/arquitectos.mock';
import { Arquitecto } from '../models/arquitecto.model';

@Injectable({
    providedIn: 'root'
})
export class ArquitectosService {

    // Obtener todos los arquitectos 
    getArquitectos(): Observable<Arquitecto[]> {
        return of(ARQUITECTOS);
    }

    // Generar dinámicamente las opciones del filtro
    getStatuses(): Observable<{ label: string; value: string }[]> {
        const uniqueSituaciones = [...new Set(ARQUITECTOS.map(a => a.situacionColegial))];
        const statuses = uniqueSituaciones.map(s => ({ label: s, value: s }));
        return of(statuses);
    }

    // Filtro por rango de fechas
    filterByDateRange(startDate: Date | null, endDate: Date | null): Observable<Arquitecto[]> {
        const filteredArquitectos = ARQUITECTOS.filter((arquitecto) => {
            const fechaAlta = new Date(arquitecto.fechaAlta);

            if (startDate && endDate) {
                return fechaAlta >= startDate && fechaAlta <= endDate;
            }
            if (startDate) {
                return fechaAlta >= startDate;
            }
            if (endDate) {
                return fechaAlta <= endDate;
            }
            return true; 
        });
        return of(filteredArquitectos);
    }

    getData(): Observable<any> {
        return of({
            totalColegiados: 1000,
            totalArquitectos: 500,
            totalSolicitudes: 200,
            totalAltas: 100
        });
    }
}
