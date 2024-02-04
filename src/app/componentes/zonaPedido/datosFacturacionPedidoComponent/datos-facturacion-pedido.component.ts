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

@Component({
  selector: 'app-datos-facturacion-pedido',
  templateUrl: './datos-facturacion-pedido.component.html',
  styleUrl: './datos-facturacion-pedido.component.css',
})
export class DatosFacturacionPedidoComponent {
  @Input() listaProvincias!: IProvincia[];
  @Input() pedidoForm!: FormGroup;
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

  ShowDireccionFactura(ev: any) {
    this.checkmismadirecfactura = ev.target.checked;
    //Si el check está marcado, se copian los datos de la dirección de envío a la de facturación
    /*
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
    */
  }

  CargarMunicipios(provSelec: string) {
    //<--- va: "cpro - nombre provincia"
    this.listaMunicipios$ = this.restSvc.RecuperarMunicipios(
      provSelec.split('-')[0]
    );
    this.render2.removeAttribute(this.selectmunis.nativeElement, 'disabled');
  }
  ngOnChanges(): void {
    this.datosEnvio = this.pedidoForm.get('datosEnvio') as FormGroup;
    this.datosFacturacion = this.pedidoForm.get(
      'datosFacturacion'
    ) as FormGroup;
    if(this.checkmismadirecfactura){
      this.datosFacturacion.patchValue({
        paisFactura: this.datosEnvio.get('pais')?.value,
        calleFactura: this.datosEnvio.get('calle')?.value,
        provinciaFactura: this.datosEnvio.get('provincia')?.value,
        municipioFactura: this.datosEnvio.get('municipio')?.value,
        cpFactura: this.datosEnvio.get('cp')?.value,
      });
    }
  }
}
