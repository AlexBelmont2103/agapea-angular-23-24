import { NgModule, InjectionToken } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// ---- modulos secundarios hijos del modulo principal de la aplicacion ----
import { AppRoutingModule } from './app-routing.module'; // modulo encargado de detectar variaciones en la ruta de la aplicacion
//En funcion de su fichero de configuracion (app-routing.module.ts),
//se encargara de cargar los componentes que correspondan en cada momento

//Modulo encargado de dar inyeccion de servicios comunes para hacer pet.http externas
//Usando servicio httpClient... tambien permite definicion INTERCEPTORS
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

//Modulo donde se definen directivas a usar en vistas de componentes para mapear objetos FormGroup y FormControl
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
//#region ---- componentes del modulo principal de la aplicacion ----
import { AppComponent } from './app.component';
import { RestnodeService } from './servicios/restnode.service';

import { SubjectstorageService } from './servicios/subjectstorage.service';

import { AuthjwtInterceptor } from './servicios_INTERCEPTORS/authjwt.interceptor';
import { PanelTiendaComponent } from './componentes/zonaTienda/panelTiendaComponent/panel-tienda.component';
import { PanelclienteComponent } from './componentes/zonaCliente/panelClienteComponent/panelcliente.component';
import { ZonaclienteModule } from './modulos_zonas/moduloZonaCliente/zonacliente.module';
import { ZonatiendaModule } from './modulos_zonas/moduloZonaTienda/zonatienda.module';
import { BusquedalibrosDirective } from './directivas/busquedalibros.directive';
//#endregion

//#region ---- directivas del modulo principal de la aplicacion ----

//#endregion

//#region ---- pipes del modulo principal de la aplicacion ----

//#endregion

//#region ---- servicios del modulo principal de la aplicacion ----

//#endregion

@NgModule({
  declarations: 
  [
    AppComponent, 
    PanelTiendaComponent, 
    PanelclienteComponent, 
    BusquedalibrosDirective
  ],
  imports: 
  [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ZonaclienteModule,
    ZonatiendaModule,
  ],
  providers: 
  [
    RestnodeService,
   {provide: 'MI_TOKEN_SERVICIOSTORAGE', useClass: SubjectstorageService},
   {provide: HTTP_INTERCEPTORS, useClass: AuthjwtInterceptor, multi: true},
  ],
   
  bootstrap: [AppComponent],
})
export class AppModule {}
