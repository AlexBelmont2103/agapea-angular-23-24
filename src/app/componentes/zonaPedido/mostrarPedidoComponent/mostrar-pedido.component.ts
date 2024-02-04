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
    this.pedidoForm.get('datosPago.metodoPago')?.setValue('pagotarjeta');

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
    console.log('Pedido registrado');
    console.log('Datos del formulario de envio', this.pedidoForm);
    if(this.pedidoForm.valid){
      console.log('Formulario de envio valido');
      //Mapeamos los campos del formulario a un objeto de tipo IDatosPago
        /*
        export interface IDatosPago {
        tipodireccionenvio: string;
        direccionPrincipal: IDireccion;
        //Datos envío
        direccionEnvio: IDireccion;
        nombreEnvio: string;
        apellidosEnvio: string;
        telefonoEnvio: string;
        emailEnvio: string;

        //Datos de facturación
        tipoFactura: string;
        nombreFactura: string;
        docfiscalFactura: string;

        //Datos pago
        metodoPago: string;
        numeroTarjeta?: string;
        nombreBanco?: string;
        mesCaducidad?: string;
        anioCaducidad?: string;
        cvv?: string;}
        */
      const datosPago: IDatosPago = {
        tipodireccionenvio: 'Principal',
        direccionPrincipal: {
          pais: this.pedidoForm.get('datosEnvio.pais')?.value,
          calle: this.pedidoForm.get('datosEnvio.calle')?.value,
          provincia: {
            CPRO: this.pedidoForm.get('datosEnvio.provincia')?.value.split('-')[0],
            PRO: this.pedidoForm.get('datosEnvio.provincia')?.value.split('-')[1],

          },
          municipio: {
            CPRO: this.pedidoForm.get('datosEnvio.provincia')?.value.split('-')[0],
            CMUM: this.pedidoForm.get('datosEnvio.municipio')?.value.split('-')[0],
            DMUN50: this.pedidoForm.get('datosEnvio.municipio')?.value.split('-')[1],
          },
          cp: this.pedidoForm.get('datosEnvio.cp')?.value,
          esPrincipal: true,
        },
        direccionEnvio: {
          pais: this.pedidoForm.get('datosEnvio.pais')?.value,
          calle: this.pedidoForm.get('datosEnvio.calle')?.value,
          provincia: this.pedidoForm.get('datosEnvio.provincia')?.value,
          municipio: this.pedidoForm.get('datosEnvio.municipio')?.value,
          cp: this.pedidoForm.get('datosEnvio.cp')?.value,
        },
        nombreEnvio: this.pedidoForm.get('datosEnvio.nombre')?.value,
        apellidosEnvio: this.pedidoForm.get('datosEnvio.apellidos')?.value,
        telefonoEnvio: this.pedidoForm.get('datosEnvio.telefonoContacto')?.value,
        emailEnvio: this.pedidoForm.get('datosEnvio.email')?.value,
        tipoFactura: this.pedidoForm.get('datosFacturacion.tipoFactura')?.value,
        nombreFactura: this.pedidoForm.get('datosFacturacion.nombre')?.value,
        docfiscalFactura: this.pedidoForm.get('datosFacturacion.docfiscalFactura')?.value,
        metodoPago: this.pedidoForm.get('datosPago.metodoPago')?.value,
        numeroTarjeta: this.pedidoForm.get('datosPago.numeroTarjeta')?.value,
        nombreBanco: this.pedidoForm.get('datosPago.nombreBanco')?.value,
        mesCaducidad: this.pedidoForm.get('datosPago.mesCaducidad')?.value,
        anioCaducidad: this.pedidoForm.get('datosPago.anioCaducidad')?.value,
        cvv: this.pedidoForm.get('datosPago.cvv')?.value,
      };
      console.log('Datos del pedido', datosPago);
    }
  }

  ngOnDestroy(): void {}
}
