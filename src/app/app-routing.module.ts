import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Modulo principal de enrutamiento usado por el modulo global de la aplicacion app.module.ts
//Necesitan tener definidos un array de objetos tipo Route
const routes: Routes = [
  {path:'Cliente', loadChildren:()=>import('./modulos_zonas/zonacliente.module').then(m=>m.ZonaclienteModule)},
  {path:'Tienda', loadChildren:()=>import('./modulos_zonas/zonatienda.module').then(m=>m.ZonatiendaModule)},
  { path: '', redirectTo: '/Tienda/Libros/2-10', pathMatch:'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }