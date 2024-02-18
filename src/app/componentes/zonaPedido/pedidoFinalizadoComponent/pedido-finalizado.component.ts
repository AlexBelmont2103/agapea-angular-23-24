import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IRestMessage } from '../../../modelos/restmessage';
import { IStorageService } from '../../../modelos/interfaceservicios';
import { RestnodeService } from '../../../servicios/restnode.service';
import { Observable, async, switchMap } from 'rxjs';

@Component({
  selector: 'app-pedido-finalizado',
  templateUrl: './pedido-finalizado.component.html',
  styleUrl: './pedido-finalizado.component.css'
})
export class PedidoFinalizadoComponent implements OnInit{
private _jwt:string="";
constructor(
  private route: ActivatedRoute,
  private restService: RestnodeService,
  @Inject('MI_TOKEN_SERVICIOSTORAGE') private storageSvc: IStorageService) 
  {

   }


  ngOnInit(): void {
    //1º: Recuperar el token del localstorage y almacenarlo en el subject del servicio de almacenamiento
    this._jwt= localStorage.getItem('tokensesion')!;
    console.log('jwt recuperado...', this._jwt);
    this.storageSvc.AlmacenarJWT(this._jwt);
    //Recuperar los datos del cliente usando la url
    this.route.queryParams.pipe(
      switchMap(params => {
        //2º: Recuperar los datos del cliente usando el token almacenado en el servicio de almacenamiento
        //Recuperar el email de la url
        const _email:string=params['email'];
        return this.restService.RecuperarDatosCliente(_email);
      })
    ).subscribe(_respuesta => {
      console.log('respuesta recuperar datos cliente...', _respuesta);
      //3º: Almacenar los datos del cliente en el servicio de almacenamiento
      if (_respuesta && _respuesta.datoscliente) {
        console.log('almacenando datos cliente...', _respuesta.datoscliente);
        this.storageSvc.AlmacenarDatosCLiente(_respuesta.datoscliente);
        //Tendria que avisar al app.component para que actualice el menu de la zona cliente

      }
    });
  }

}
