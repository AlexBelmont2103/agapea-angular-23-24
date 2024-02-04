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

  constructor(private restSvc: RestnodeService, private render2: Renderer2) {
    this.datosFacturacion = this.pedidoForm.get('datosFacturacion') as FormGroup;
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
    if (this.checkmismadirecfactura) {
      this.pedidoForm.get('datosFacturacion.paisFactura')?.setValue(this.pedidoForm.get('pais')?.value);
      this.pedidoForm.get('datosFacturacion.calleFactura')?.setValue(this.pedidoForm.get('calle')?.value);
      this.pedidoForm.get('datosFacturacion.provinciaFactura')?.setValue(this.pedidoForm.get('provincia')?.value);
      this.pedidoForm.get('datosFacturacion.municipioFactura')?.setValue(this.pedidoForm.get('municipio')?.value);
      this.pedidoForm.get('datosFacturacion.cpFactura')?.setValue(this.pedidoForm.get('cp')?.value);
    }
  }

  CargarMunicipios(provSelec: string) {
    //<--- va: "cpro - nombre provincia"
    this.listaMunicipios$ = this.restSvc.RecuperarMunicipios(
      provSelec.split('-')[0]
    );
    this.render2.removeAttribute(this.selectmunis.nativeElement, 'disabled');
  }
  ngOnChanges(): void {
    this.datosFacturacion = this.pedidoForm.get(
      'datosFacturacion'
    ) as FormGroup;
  }
}
