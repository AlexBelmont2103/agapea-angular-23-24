import {
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { IMunicipio } from '../../../modelos/municipio';
import { IProvincia } from '../../../modelos/provincia';
import { RestnodeService } from '../../../servicios/restnode.service';
import { FormGroup } from '@angular/forms';
import { IDatosPago } from '../../../modelos/datospago';

@Component({
  selector: 'app-datos-facturacion-pedido',
  templateUrl: './datos-facturacion-pedido.component.html',
  styleUrl: './datos-facturacion-pedido.component.css',
})
export class DatosFacturacionPedidoComponent {
  @Input() listaProvincias!: IProvincia[];
  @Input() datosPago!: IDatosPago;
  @ViewChild('selectmunis') selectmunis!: ElementRef;

  public checkempresa: boolean = true;
  public checkmismadirecfactura: boolean = true;
  public listaMunicipios$!: Observable<IMunicipio[]>;
  public datosFacturacion!: FormGroup;
  public datosEnvio!: FormGroup;

  constructor(private restSvc: RestnodeService, private render2: Renderer2) {
    
  }

  CheckEmpresaChange(valor: boolean) {
    this.checkempresa = valor;
  }
  ChangeDirecFacturacion(){
    this.checkmismadirecfactura = ! this.checkmismadirecfactura;

    if(this.checkmismadirecfactura) {
      this.datosPago.direccionFacturacion=this.datosPago.direccionEnvio;
    } else {
      this.datosPago.direccionFacturacion={
                                            calle:        '',
                                            pais:         'España',
                                            cp:           0,
                                            provincia:    { CCOM:'', PRO:'', CPRO:''},
                                            municipio:    { CUN:'', CPRO:'', CMUM:'', DMUN50:''},
                                            esPrincipal:  true,
                                            esFacturacion: false,
                                      };
    }

  }

  ShowDireccionFactura(ev: any) {
    this.checkmismadirecfactura = ev.target.checked;
  }

  CargarMunicipios(provSelec: string) {
    //<--- va: "cpro - nombre provincia"
    this.listaMunicipios$ = this.restSvc.RecuperarMunicipios(
      provSelec.split('-')[0]
    );
    this.render2.removeAttribute(this.selectmunis.nativeElement, 'disabled');
    this.datosPago.direccionFacturacion!.provincia={CCOM:'', CPRO: provSelec.split('-')[0], PRO: provSelec.split('-')[1] };

  }
  EstableceMunicipio( muniSelec: string){
    this.datosPago.direccionEnvio!.municipio={CUN:'', CPRO: this.datosPago.direccionEnvio!.provincia.CPRO, CMUM:muniSelec.split('-')[0] , DMUN50: muniSelec.split('-')[1] }
  }
  ngOnChanges(): void {

  }
}
