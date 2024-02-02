import { Component } from '@angular/core';
import { RestnodeService } from '../../../servicios/restnode.service';
import { ICategoria } from '../../../modelos/categoria';

@Component({
  selector: 'app-panel-tienda',
  templateUrl: './panel-tienda.component.html',
  styleUrl: './panel-tienda.component.css'
})
export class PanelTiendaComponent {
  public cats: ICategoria[] = [];

  constructor(private restSvc: RestnodeService) {
    this.restSvc.RecuperarCategorias("padres").subscribe(
      (datos: ICategoria[]) => {
        this.cats = datos;
      }
    );
    
  }
}
