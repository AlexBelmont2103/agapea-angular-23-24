import { Component, Inject, OnDestroy } from '@angular/core';
import { Observable, Subscription, combineLatest, map, of, tap } from 'rxjs';
import { IStorageService } from '../../../modelos/interfaceservicios';
import { ILibro } from '../../../modelos/libro';
import { IProvincia } from '../../../modelos/provincia';
import { RestnodeService } from '../../../servicios/restnode.service';

@Component({
  selector: 'app-mostrar-pedido',
  templateUrl: './mostrar-pedido.component.html',
  styleUrl: './mostrar-pedido.component.css',
})
export class MostrarPedidoComponent implements OnDestroy{
  public listaItems$!: Observable<
    { libroElemento: ILibro; cantidadElemento: number }[]
  >;
  public subtotalPedido$!: Observable<number>;
  public gastosEnvio: number = 0;
  public provincias$!: Observable<IProvincia[]>;
  public showcompodatosfacturacion: boolean = false;


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
  showCompodatosfacturacion(check: boolean): void {
    this.showcompodatosfacturacion = check;
  }

  ModficarItemPedido(item: {
    libroElemento: ILibro;
    cantidadElemento: number;
  }) {
    if (item.cantidadElemento === 0) {
      this.storageSvc.OperarElementosPedido(item.libroElemento, 'borrar');
    }
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
  ManejarGastosEnvio(gastosEnvio: number): void {
    this.gastosEnvio = gastosEnvio;
  }


  ngOnDestroy(): void {
    
  }
}
