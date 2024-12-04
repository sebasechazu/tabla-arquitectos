import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ARQUITECTOS } from '../mocks/arquitectos.mock';
import { Arquitecto } from '../models/arquitecto.model';

@Injectable({
    providedIn: 'root'
})
export class ArquitectosService {
    getArquitectos(): Observable<Arquitecto[]> {
        return of(ARQUITECTOS);
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
