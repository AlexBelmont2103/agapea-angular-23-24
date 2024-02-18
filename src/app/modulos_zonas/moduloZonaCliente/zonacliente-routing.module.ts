import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../../componentes/zonaCliente/loginComponent/login.component';
import { RegistroComponent } from '../../componentes/zonaCliente/registroComponent/registro.component';
import { RegistrookComponent } from '../../componentes/zonaCliente/registroOkComponent/registrook.component';
import { IniciopanelComponent } from '../../componentes/zonaCliente/inicioPanelComponent/iniciopanel.component';
const routes: Routes = [
    {path:'Registro', component:RegistroComponent},
    {path:'Login', component:LoginComponent},
    {path:'RegistroOk',component:RegistrookComponent},
    {path: 'Panel',children:[
    {path: 'InicioPanel', component:IniciopanelComponent}
    ]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZonaclienteRoutingModule { }
