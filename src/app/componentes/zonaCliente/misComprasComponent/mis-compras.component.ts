import { Component, Inject } from '@angular/core';
import { IStorageService } from '../../../modelos/interfaceservicios';
import { ICliente } from '../../../modelos/cliente';
import { IPedido } from '../../../modelos/pedido';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mis-compras',
  templateUrl: './mis-compras.component.html',
  styleUrl: './mis-compras.component.css'
})
export class MisComprasComponent {
  public cliente!:ICliente
  public suscription:Subscription = new Subscription();
  public pedidos!:IPedido[];
  public meses: Array<[string, string]> = 
  [["1","Enero"],["2","Febrero"], ["3","Marzo"], ["4","Abril"], ["5","Mayo"], ["6","Junio"], ["7","Julio"], ["8","Agosto"], ["9","Septiembre"], ["10","Octubre"], ["11","Noviembre"], ["12","Diciembre"]] ;
  public anios: Array<number> = Array.from({ length: new Date(Date.now()).getFullYear() - 1933 }, (el, pos) => pos + 1934);
  public mesSeleccionado:number=0;
  public anioSeleccionado:number=0;
  constructor(@Inject('MI_TOKEN_SERVICIOSTORAGE') private storageSvc:IStorageService) {
    this.suscription=this.storageSvc.RecuperarDatosCliente()
                    .subscribe(
                      (data)=>{
                        if(data){
                          this.cliente=data;
                        }
                      }
                    );
      this.pedidos=this.cliente.pedidosCliente!; 
   }
   FiltrarPedidos():void{
    //formato fecha 2024-02-17T16:03:50.180Z
    let pedidoFiltrado:IPedido[];

    if(this.mesSeleccionado!==0 && this.anioSeleccionado!==0){
      pedidoFiltrado=this.cliente.pedidosCliente!.filter(
        pedido=>
        {
          const [anio, mes, resto]=pedido.fechaPedido.toString().split('-');
          if(parseInt(anio)===this.anioSeleccionado && parseInt(mes)===this.mesSeleccionado){
            return true;
          }
          else{
            return false;
          }
        }
        );
    }
    else if(this.anioSeleccionado!==0){
      pedidoFiltrado=this.pedidos.filter(
        pedido=>
        {
          const fechaPedido:Date=new Date(pedido.fechaPedido);
          return fechaPedido.getFullYear()===this.anioSeleccionado;
        }
        );
    }
    else{
      pedidoFiltrado=this.cliente.pedidosCliente!;
    }

    this.pedidos=pedidoFiltrado;
    
  }
  SeleccionarMes(event:Event){
    if (event.target) {
      const selectElement = event.target as HTMLSelectElement;
      this.mesSeleccionado=parseInt(selectElement.value);
    }
  }
  SeleccionarAnio(event:Event){
    if (event.target) {
      const selectElement = event.target as HTMLSelectElement;
      this.anioSeleccionado=parseInt(selectElement.value);
    }
  }
}
