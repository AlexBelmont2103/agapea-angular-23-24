import { Component, Inject } from '@angular/core';
import { IStorageService } from '../../../modelos/interfaceservicios';
import { ICliente } from '../../../modelos/cliente';

@Component({
  selector: 'app-mis-compras',
  templateUrl: './mis-compras.component.html',
  styleUrl: './mis-compras.component.css'
})
export class MisComprasComponent {
  public meses: Array<string> = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  public anios: Array<number> = Array.from({ length: new Date(Date.now()).getFullYear() - 1933 }, (el, pos) => pos + 1934);
  public cliente?:ICliente
  constructor(@Inject('MI_TOKEN_SERVICIOSTORAGE') private storageSvc:IStorageService) {
    this.storageSvc.RecuperarDatosCliente().subscribe((cliente:ICliente|null) => {
      if(cliente) {
        this.cliente=cliente;
        console.log('Cliente recuperado: ', cliente);
      }
    });
   }
}
