import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZonaclienteRoutingModule } from './zonacliente-routing.module';
import { IniciopanelComponent } from '../componentes/zonaCliente/inicioPanelComponent/iniciopanel.component';
import { LoginComponent } from '../componentes/zonaCliente/loginComponent/login.component';
import { RegistroComponent } from '../componentes/zonaCliente/registroComponent/registro.component';
import { RegistrookComponent } from '../componentes/zonaCliente/registroOkComponent/registrook.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ComprobacionexisteemailDirective } from '../directivas/comprobacionexistemail.directive';
import { EmailfilterdomainDirective } from '../directivas/emailfilterdomain.directive';


@NgModule({
  declarations: [
    EmailfilterdomainDirective, 
    ComprobacionexisteemailDirective,  
    LoginComponent,
    RegistroComponent,
    RegistrookComponent,
    IniciopanelComponent
  ],
  imports: [
    CommonModule,
    ZonaclienteRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ZonaclienteModule { }
