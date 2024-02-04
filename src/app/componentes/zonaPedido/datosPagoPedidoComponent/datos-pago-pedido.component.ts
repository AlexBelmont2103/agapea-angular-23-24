import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-datos-pago-pedido',
  templateUrl: './datos-pago-pedido.component.html',
  styleUrl: './datos-pago-pedido.component.css'
})
export class DatosPagoPedidoComponent {
  @Input() tituloPago:string="2. - Datos Pago.";
 
  meses:number[]=Array.from({length:12}, (el,pos)=> pos+1);
  //meses:string[]=[ 'Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre' ];
  anios:number[]=Array.from( { length: new Date(Date.now()).getFullYear() - 1933 }, (el,pos)=> pos + 1934 );
}
