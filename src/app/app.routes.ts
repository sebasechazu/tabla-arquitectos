import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { EstudiantesComponent } from './components/estudiantes/estudiantes.component';
import { ProfesoresComponent } from './components/profesores/profesores.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'cursos' },
            {
                path: 'cursos',
                component: CursosComponent
            },
            {
                path: 'estudiantes',
                component: EstudiantesComponent
            },
            {
                path: 'profesores',
                component: ProfesoresComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
