import { Component, Inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ICliente } from '../../../modelos/cliente';
import { Router } from '@angular/router';
import { IStorageService } from '../../../modelos/interfaceservicios';

@Component({
  selector: 'app-panelcliente',
  templateUrl: './panelcliente.component.html',
  styleUrl: './panelcliente.component.css'
})
export class PanelclienteComponent {
  public cliente!:ICliente;
  public listaOpciones:string[]=["Inicio Panel", "Mis Compras","Mis Opiniones","Mis Listas"];
  private subscriptorCliente:Subscription;

  constructor(@Inject('MI_TOKEN_SERVICIOSTORAGE') private storageSvc:IStorageService, private router:Router){
      this.subscriptorCliente=(this.storageSvc.RecuperarDatosCliente() as Observable<ICliente|null>)
                              .subscribe(
                                    (datos:ICliente | null)=> {if (datos){ this.cliente=datos } else { this.router.navigateByUrl('/Cliente/Login') } }
                              );
  }
  ngOnDestroy(): void {
    this.subscriptorCliente.unsubscribe();
  }
  
}
