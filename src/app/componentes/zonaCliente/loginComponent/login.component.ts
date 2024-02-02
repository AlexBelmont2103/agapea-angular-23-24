import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RestnodeService } from '../../../servicios/restnode.service';
import { IRestMessage } from '../../../modelos/restmessage';
import { IStorageService } from '../../../modelos/interfaceservicios';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public credenciales:{ email:string, password:string}={ email:'', password:''};
  public erroresLoginServer:string="";
  

  constructor( private router:Router,
               private restService: RestnodeService,
               @Inject('MI_TOKEN_SERVICIOSTORAGE') private storageSvc: IStorageService ) {   }

  irARegistro(){
    this.router.navigateByUrl('/Cliente/Registro');
  }

 async LoginCliente(loginform:NgForm){
    console.log('el ngForm vale...', loginform.form);

    const _respuesta:IRestMessage=await this.restService.LoginCliente(loginform.form.value);
    console.log('respuesta login...', _respuesta);
    if(_respuesta.codigo===0 && _respuesta.datoscliente && _respuesta.tokensesion){
      this.storageSvc.AlmacenarDatosCLiente(_respuesta.datoscliente);
      this.storageSvc.AlmacenarJWT(_respuesta.tokensesion);
        this.router.navigateByUrl('/Tienda/Libros/2-10');
    } else {
      //mostrar mensajes de error en vista del componente...
      this.erroresLoginServer=_respuesta.error!;
    }

  }
}
