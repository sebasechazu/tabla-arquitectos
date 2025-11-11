import { Component, OnInit, inject } from '@angular/core';
import { TablaArquitectosComponent } from "./components/tabla-arquitectos/tabla-arquitectos.component";
import { ArquitectosService } from './services/arquitectos.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [TablaArquitectosComponent, ButtonModule, DialogModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private arquitectosService = inject(ArquitectosService);

  totalColegiados: number | undefined;
  totalArquitectos: number | undefined;
  totalSolicitudes: number | undefined;
  totalAltas: number | undefined;

  visible: boolean = false;

  ngOnInit(): void {
    this.arquitectosService.getData().subscribe(data => {
      this.totalColegiados = data.totalColegiados;
      this.totalArquitectos = data.totalArquitectos;
      this.totalSolicitudes = data.totalSolicitudes;
      this.totalAltas = data.totalAltas;
    });
  }

  title = 'tabla-arquitectos';

  protected showDialog(){
    this.visible = true;
    console.log('show dialog');
  }

  protected closeDialog(){
    this.visible = false;
    console.log('close dialog');
  }
}
