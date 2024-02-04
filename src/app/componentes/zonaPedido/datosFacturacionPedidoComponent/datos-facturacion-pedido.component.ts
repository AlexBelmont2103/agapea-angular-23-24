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

  constructor(private restSvc: RestnodeService, private render2: Renderer2) {}

  CheckEmpresaChange(valor: boolean) {
    this.checkempresa = valor;
  }

  CargarMunicipios(provSelec: string) {
    //<--- va: "cpro - nombre provincia"
    this.listaMunicipios$ = this.restSvc.RecuperarMunicipios(
      provSelec.split('-')[0]
    );
    this.render2.removeAttribute(this.selectmunis.nativeElement, 'disabled');
  }
}
