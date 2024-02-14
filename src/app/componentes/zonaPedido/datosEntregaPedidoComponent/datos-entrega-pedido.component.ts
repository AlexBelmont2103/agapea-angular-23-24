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

@Component({
  selector: 'app-datos-entrega-pedido',
  templateUrl: './datos-entrega-pedido.component.html',
  styleUrl: './datos-entrega-pedido.component.css',
})
export class DatosEntregaPedidoComponent implements OnDestroy {
  @Input() provincias!: IProvincia[];
  @Input() datosPago!: IDatosPago;
  @Output() checkdatosFacturacionEnvio: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() gastosEnvio: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('selectmunis') selectmunis!: ElementRef;

  public datoscliente!: ICliente | null;
  public direccionprincipal!: IDireccion | undefined;
  public otraDireccion: IDireccion | undefined;
  public listaMunicipios$!: Observable<IMunicipio[]>;
  
  public datosclienteSubsciptor: Subscription;
  private _dirEnvioIni:IDireccion={
    calle:        '',
    pais:         'España',
    cp:           0,
    provincia:    { CCOM:'', PRO:'', CPRO:''},
    municipio:    { CUN:'', CPRO:'', CMUM:'', DMUN50:''},
    esPrincipal:  true,
    esFacturacion: false,
};
  //Variable de tipo switch para ocultar/mostrar partes de la vista
  public checkdirppalenvio: boolean = true;
  public checkclienteloggedenvio: boolean = true;
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
  CargarMunicipios(provselect: string): void {
    const codpro = provselect.split('-')[0];
    this.listaMunicipios$ = this.restSvc.RecuperarMunicipios(codpro);
    this.render2.removeAttribute(this.selectmunis.nativeElement, 'disabled');
    this.datosPago.direccionEnvio!.provincia={CCOM:'', CPRO: provselect.split('-')[0], PRO: provselect.split('-')[1] }
    //Arpovechamos este método para calcular el precio del envío
    this.CalculaPrecioEnvio(codpro);
  }
  EstableceMunicipio( muniSelec: string){
    this.datosPago.direccionEnvio!.municipio={CUN:'', CPRO: this.datosPago.direccionEnvio!.provincia.CPRO, CMUM:muniSelec.split('-')[0] , DMUN50: muniSelec.split('-')[1] }
  }
  CalculaPrecioEnvio(codpro: string): void {
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

  CheckdirPpalEnvio(check:boolean){
    this.checkdirppalenvio=check;
    if (check) {
        this.datosPago.tipodireccionenvio='principal';
        this.datosPago.direccionEnvio=this.direccionprincipal;  
    } else {
        this.datosPago.tipodireccionenvio='otradireccion';
        this.datosPago.direccionEnvio=this._dirEnvioIni;

    }
  }

  CheckClienteLoggedEnvio(check:boolean){
    this.checkclienteloggedenvio=check;
  }
  ShowCompodatosfacturacion(ev: any){
   
    this.checkdatosFacturacionEnvio.emit(ev.target.checked);
  }

  ngOnChanges(): void {
    if(!this.checkdirppalenvio){
      this.datosPago.direccionEnvio=this._dirEnvioIni;
  }
  }
  ngOnDestroy(): void {
    this.datosclienteSubsciptor.unsubscribe();
  }
}
