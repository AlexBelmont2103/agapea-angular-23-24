import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ICliente } from '../../../modelos/cliente';
import { Observable, Subscription } from 'rxjs';
import { IStorageService } from '../../../modelos/interfaceservicios';
import { IDireccion } from '../../../modelos/direccion';
import { IProvincia } from '../../../modelos/provincia';
import { IMunicipio } from '../../../modelos/municipio';
import { RestnodeService } from '../../../servicios/restnode.service';
import { IDatosPago } from '../../../modelos/datospago';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-datos-entrega-pedido',
  templateUrl: './datos-entrega-pedido.component.html',
  styleUrl: './datos-entrega-pedido.component.css',
})
export class DatosEntregaPedidoComponent implements OnDestroy {
  @Input() provincias!: IProvincia[];
  @Input() pedidoForm!: FormGroup;
  @Output() checkdatosFacturacionEnvio: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() gastosEnvio: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('selectmunis') selectmunis!: ElementRef;

  public datoscliente!: ICliente | null;
  public direccionprincipal!: IDireccion | undefined;
  public otraDireccion: IDireccion | undefined;
  public datosclienteSubsciptor: Subscription;
  public listaMunicipios$!: Observable<IMunicipio[]>;

  //Variable de tipo switch para ocultar/mostrar partes de la vista
  public checkdirppalenvio: boolean = true;
  public checkclienteloggedenvio: boolean = true;
  public datosEnvioForm!: FormGroup;
  constructor(
    @Inject('MI_TOKEN_SERVICIOSTORAGE') private storageSvc: IStorageService,
    private restSvc: RestnodeService,
    private render2: Renderer2
  ) {
    //this.datoscliente$=this.storageSvc.RecuperarDatosCliente();
    this.datosclienteSubsciptor = this.storageSvc
      .RecuperarDatosCliente()
      .subscribe((datoscliente: ICliente | null) => {
        this.datoscliente = datoscliente;
        this.direccionprincipal = this.datoscliente?.direcciones.find(
          (direccion: IDireccion) => direccion.esPrincipal === true
        )!;
      });
  }
  cargarMunicipios(event: Event): void {
    const codpro = (event.target as HTMLSelectElement).value.split('-')[0];
    this.listaMunicipios$ = this.restSvc.RecuperarMunicipios(codpro);
    this.render2.removeAttribute(this.selectmunis.nativeElement, 'disabled');
    //Arpovechamos este método para calcular el precio del envío
    this.CalculaPrecioEnvio(codpro);
  }
  CalculaPrecioEnvio(codpro: string): void {
    //35 el codigo de las palmas
    //38 el codigo de santa cruz de tenerife
    //51 es ceuta
    //52 es melilla
    if (
      codpro === '35' ||
      codpro === '38' ||
      codpro === '51' ||
      codpro === '52'
    ) {
      this.gastosEnvio.emit(5);
    } else {
      this.gastosEnvio.emit(2);
    }
  }

  CheckdirPpalEnvio(check: boolean): void {
    this.checkdirppalenvio = check;
    //Si es true, los formControl de la direccion de envio se rellean con los datos de la direccion principal
    if (check) {
      this.datosEnvioForm.patchValue({
        pais: this.direccionprincipal?.pais,
        calle: this.direccionprincipal?.calle,
        provincia: this.direccionprincipal?.provincia,
        municipio: this.direccionprincipal?.municipio,
        cp: this.direccionprincipal?.cp,
      });
    }
  }

  CheckClienteLoggedEnvio(check: boolean): void {
    this.checkclienteloggedenvio = check;
    //Si es true, los formControl de los datos de contacto se rellean con los datos del cliente
    if (check) {
      this.datosEnvioForm.patchValue({
        nombre: this.datoscliente?.nombre,
        apellidos: this.datoscliente?.apellidos,
        email: this.datoscliente?.cuenta.email,
        telefonoContacto: this.datoscliente?.telefono,
      });
    }
  }
  ShowCompodatosfacturacion(ev: any){
    //Si checked es true, añadimos un formgroup de datos de facturacion al formgroup de datos del pedido
   this.pedidoForm.addControl('datosFacturacion', new FormGroup({
    tipoFactura: new FormControl('', [Validators.required]),
    nombreFactura: new FormControl('', [Validators.required]),
    docfiscalFactura: new FormControl('', [Validators.required]),
    paisFactura: new FormControl('', [Validators.required]),
    calleFactura: new FormControl('', [Validators.required]),
    provinciaFactura: new FormControl('', [Validators.required]),
    municipioFactura: new FormControl('', [Validators.required]),
    cpFactura: new FormControl('', [Validators.required]),
    }));
    //Si checked es false, comprobamos si existe el formgroup de datos de facturacion y lo eliminamos
    if(!ev.target.checked){
      this.pedidoForm.removeControl('datosFacturacion');
    }
    this.checkdatosFacturacionEnvio.emit(ev.target.checked);
  }

  ngOnChanges(): void {
    this.datosEnvioForm = this.pedidoForm.get('datosEnvio') as FormGroup;
    console.log(
      'Valor del FormGroup en el ngOnChanges de datos-entrega-pedido.component.ts',
      this.datosEnvioForm
    );
  }
  ngOnDestroy(): void {
    this.datosclienteSubsciptor.unsubscribe();
  }
}
