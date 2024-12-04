import { Component } from '@angular/core';
import { TablaArquitectosComponent } from "./components/tabla-arquitectos/tabla-arquitectos.component";
import { OnInit } from '@angular/core';
import { ArquitectosService } from './services/arquitectos.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TablaArquitectosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  totalColegiados: number | undefined;
  totalArquitectos: number | undefined;
  totalSolicitudes: number | undefined;
  totalAltas: number | undefined;

  constructor(private arquitectosService: ArquitectosService) { }

  ngOnInit(): void {
    this.arquitectosService.getData().subscribe(data => {
      this.totalColegiados = data.totalColegiados;
      this.totalArquitectos = data.totalArquitectos;
      this.totalSolicitudes = data.totalSolicitudes;
      this.totalAltas = data.totalAltas;
    });
  }

  title = 'tabla-arquitectos';
}
