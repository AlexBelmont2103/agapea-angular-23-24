import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-datos-pago-pedido',
  templateUrl: './datos-pago-pedido.component.html',
  styleUrl: './datos-pago-pedido.component.css'
})
export class DatosPagoPedidoComponent {
  @Input() tituloPago:string="2. - Datos Pago.";
  @Input() pedidoForm!: FormGroup;
  @ViewChild('datosTarjeta') datosTarjeta!:ElementRef;
  public datosPago!:FormGroup;
 
  meses:number[]=Array.from({length:12}, (el,pos)=> pos+1);
  //meses:string[]=[ 'Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre' ];
  anios:number[]=Array.from( { length: new Date(Date.now()).getFullYear() - 1933 }, (el,pos)=> pos + 1934 );

  /**
   *
   */
  constructor(private render2:Renderer2) {
   
  }

  MostrarCamposTarjeta(ev:any):void{
    //Si vale pagopaypal, se ocultan los campos de tarjeta (añadimos atributo hidden)
    if(ev.target.value==='pagopaypal'){
      //Con render2 cogeremos el elemento por su name y le añadiremos el atributo hidden
      this.render2.setAttribute(this.datosTarjeta.nativeElement,'hidden','true');
    }else{
      this.render2.removeAttribute(this.datosTarjeta.nativeElement,'hidden');
    }
  }
  ngOnChanges():void{
    this.datosPago=this.pedidoForm.get('datosPago') as FormGroup;
  }
}
