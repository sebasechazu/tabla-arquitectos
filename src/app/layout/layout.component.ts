import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DrawerModule, ButtonModule, ToolbarModule, DialogModule, AvatarModule, MenuModule],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  sidebarVisible: boolean = false;
  perfilMenuItems = [
    {
      label: 'Perfil',
      icon: 'pi pi-user',
      command: () => { /* Aquí podrías abrir un modal de perfil real si lo deseas */ }
    },
    {
      label: 'Cerrar sesión',
      icon: 'pi pi-sign-out',
      command: () => { /* Aquí podrías implementar lógica de logout */ }
    }
  ];
  currentYear = new Date().getFullYear();
  pageTitle = 'Panel Administrativo';

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.pageTitle = this.getPageTitle(this.router.url);
    });
    this.pageTitle = this.getPageTitle(this.router.url);
  }

  getPageTitle(url: string): string {
    if (url.includes('/cursos')) return 'Cursos';
    if (url.includes('/estudiantes')) return 'Estudiantes';
    if (url.includes('/profesores')) return 'Profesores';
    return 'Panel Administrativo';
  }

  go(ruta: string) {
    this.router.navigate([ruta]);
    this.sidebarVisible = false;
    this.pageTitle = this.getPageTitle('/' + ruta);
  }
}
