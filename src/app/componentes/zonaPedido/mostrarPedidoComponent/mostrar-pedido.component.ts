import { Component, Inject, OnDestroy } from '@angular/core';
import { Observable, Subscription, combineLatest, map, merge, mergeMap, of, tap } from 'rxjs';
import { IStorageService } from '../../../modelos/interfaceservicios';
import { ILibro } from '../../../modelos/libro';
import { IProvincia } from '../../../modelos/provincia';
import { RestnodeService } from '../../../servicios/restnode.service';
import { IDatosPago } from '../../../modelos/datospago';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPedido } from '../../../modelos/pedido';

@Component({
  selector: 'app-mostrar-pedido',
  templateUrl: './mostrar-pedido.component.html',
  styleUrl: './mostrar-pedido.component.css',
})
export class MostrarPedidoComponent implements OnDestroy {
  public listaItems$!: Observable<
    { libroElemento: ILibro; cantidadElemento: number }[]
  >;
  public subtotalPedido$!: Observable<number>;
  public gastosEnvio: number = 0;
  public provincias$!: Observable<IProvincia[]>;
  public showcompodatosfacturacion: boolean = false;
  public datosPago:IDatosPago={  tipodireccionenvio:'principal', tipoDireccionFactura: 'igualenvio', metodoPago:'tarjeta' };
  constructor(
    @Inject('MI_TOKEN_SERVICIOSTORAGE') private storageSvc: IStorageService,
    private restSvc: RestnodeService
  ) {
    this.listaItems$ = this.storageSvc.RecuperarElementosPedido();
    this.provincias$ = this.restSvc.RecuperarProvincias();


    //Calcular el subtotal y el total del pedido
    this.subtotalPedido$ = this.listaItems$.pipe(
      map((listaItems: { libroElemento: ILibro; cantidadElemento: number }[]) =>
        listaItems.reduce(
          (
            acumulador: number,
            item: { libroElemento: ILibro; cantidadElemento: number }
          ) => acumulador + item.cantidadElemento * item.libroElemento.Precio,
          0
        )
      )
    );
  }
  ShowCompodatosfacturacion(check: boolean): void {
    this.showcompodatosfacturacion = check;
  }

  ModficarItemPedido( item: [ {libroElemento: ILibro, cantidadElemento:number}, string ]){
    this.storageSvc.OperarElementosPedido(item[0].libroElemento, item[1]);
  
  }
    //Actualizamos el observable de listaItems$
  
  ManejarGastosEnvio(gastosEnvio: number): void {
    this.gastosEnvio = gastosEnvio;
  }

  RegistrarPedido(): void {
    console.log('Pedido registrado:',this.datosPago);
    //Creamos el pedido para enviarlo al servidor
    /*
    idPedido: string,
    fechaPedido: Date,
    estadoPedido: string,
    elementosPedido: Array< {libroElemento: ILibro, cantidadElemento:number} >,
    subtotalPedido: number,
    gastosEnvioPedido: number,
    totalPedido: number,
    datosPago:IDatosPago
     
     */
    const pedido: IPedido = {
      idPedido: window.crypto.randomUUID(),
      fechaPedido: new Date(),
      estadoPedido: 'pendiente de pago',
      elementosPedido: [],
      subtotalPedido: 0,
      gastosEnvioPedido: this.gastosEnvio,
      totalPedido: 0,
      datosPago: this.datosPago,
    };

    this.listaItems$.pipe(
      mergeMap(listaItems => {
        pedido.elementosPedido = listaItems;
        let _subtotal=listaItems.reduce( (s,i)=>s + (i.libroElemento.Precio * i.cantidadElemento), 0);
        pedido.subtotalPedido=_subtotal;
        pedido.totalPedido=_subtotal + pedido.gastosEnvioPedido;
        return this.storageSvc.RecuperarDatosCliente();
      }),
    ).subscribe(
      async clientelog => {
        console.log('datos a mandar a server...',{ pedido: pedido, email: clientelog!.cuenta.email});
        let _urlObject=await this.restSvc.FinalizarPedido( pedido, clientelog!.cuenta.email);
        }
    );

  }

  ngOnDestroy(): void {}
}
