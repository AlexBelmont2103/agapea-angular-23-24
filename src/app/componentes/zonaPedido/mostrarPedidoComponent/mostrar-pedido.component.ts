import { Component, Inject, OnDestroy } from '@angular/core';
import { Observable, Subscription, combineLatest, map, of, tap } from 'rxjs';
import { IStorageService } from '../../../modelos/interfaceservicios';
import { ILibro } from '../../../modelos/libro';
import { IProvincia } from '../../../modelos/provincia';
import { RestnodeService } from '../../../servicios/restnode.service';
import { IDatosPago } from '../../../modelos/datospago';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mostrar-pedido',
  templateUrl: './mostrar-pedido.component.html',
  styleUrl: './mostrar-pedido.component.css',
})
export class MostrarPedidoComponent implements OnDestroy {
  //Observable que contiene todos los datos del pago
  public datosPago$!: Observable<IDatosPago>;
  public listaItems$!: Observable<
    { libroElemento: ILibro; cantidadElemento: number }[]
  >;
  public subtotalPedido$!: Observable<number>;
  public gastosEnvio: number = 0;
  public provincias$!: Observable<IProvincia[]>;
  public showcompodatosfacturacion: boolean = false;

  public pedidoForm: FormGroup = new FormGroup({
    datosEnvio: new FormGroup({
      pais: new FormControl('', [Validators.required]),
      calle: new FormControl('', [Validators.required]),
      provincia: new FormControl('', [Validators.required]),
      municipio: new FormControl('', [Validators.required]),
      cp: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefonoContacto: new FormControl('', [Validators.required]),
      telefonoContactoNuevo: new FormControl(''),
      otrosDatos: new FormControl(''),
    }),
    datosPago: new FormGroup({
      metodoPago: new FormControl('', [Validators.required]),
      numeroTarjeta: new FormControl(''),
      nombreBanco: new FormControl(''),
      mesCaducidad: new FormControl(''),
      anioCaducidad: new FormControl(''),
      cvv: new FormControl(''),
    }),
  });

  constructor(
    @Inject('MI_TOKEN_SERVICIOSTORAGE') private storageSvc: IStorageService,
    private restSvc: RestnodeService
  ) {
    this.listaItems$ = this.storageSvc.RecuperarElementosPedido();
    this.provincias$ = this.restSvc.RecuperarProvincias();
    this.datosPago$ = this.storageSvc.RecuperarDatosPago();

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

  RegistrarPedido(): void {
    console.log('Pedido registrado');
    console.log('Datos del formulario de envio', this.pedidoForm);
  }

  ngOnDestroy(): void {}
}
