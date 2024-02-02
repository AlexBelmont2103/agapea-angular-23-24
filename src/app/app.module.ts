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
import { RegistroComponent } from './componentes/zonaCliente/registroComponent/registro.component';
import { LoginComponent } from './componentes/zonaCliente/loginComponent/login.component';
import { RestnodeService } from './servicios/restnode.service';
import { EmailfilterdomainDirective } from './directivas/emailfilterdomain.directive';
import { ComprobacionexisteemailDirective } from './directivas/comprobacionexistemail.directive';
import { RegistrookComponent } from './componentes/zonaCliente/registroOkComponent/registrook.component';
import { PanelClienteComponent } from './componentes/zonaCliente/panelClienteComponent/panel-cliente.component';
import { PanelTiendaComponent } from './componentes/zonaTienda/panelTiendaComponent/panel-tienda.component';
import { RedondeocantidadPipe } from './pipes/redondeocantidad.pipe';
import { LibrosComponent } from './componentes/zonaTienda/librosComponent/libros.component';
import { MinilibroComponent } from './componentes/zonaTienda/miniLibroComponent/minilibro.component';
import { DetalleslibroComponent } from './componentes/zonaTienda/detallesLibroComponent/detalleslibro.component';
import { SubjectstorageService } from './servicios/subjectstorage.service';
import { ElementoPedidoComponent } from './componentes/zonaPedido/elementoPedidoComponent/elemento-pedido.component';
import { MostrarPedidoComponent } from './componentes/zonaPedido/mostrarPedidoComponent/mostrar-pedido.component';
import { MI_TOKEN_SERVICIOSTORAGE } from './servicios/injectiontokenstorageservices';
import { DatosEntregaPedidoComponent } from './componentes/zonaPedido/datosEntregaPedidoComponent/datos-entrega-pedido.component';
import { DatosFacturacionPedidoComponent } from './componentes/zonaPedido/datosFacturacionPedidoComponent/datos-facturacion-pedido.component';
import { DatosPagoPedidoComponent } from './componentes/zonaPedido/datosPagoPedidoComponent/datos-pago-pedido.component';
import { AuthjwtInterceptor } from './servicios_INTERCEPTORS/authjwt.interceptor';
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
    RegistroComponent, 
    LoginComponent, 
    EmailfilterdomainDirective, 
    ComprobacionexisteemailDirective,  
    RegistrookComponent, 
    PanelClienteComponent, 
    PanelTiendaComponent, 
    RedondeocantidadPipe, 
    LibrosComponent, 
    MinilibroComponent, 
    DetalleslibroComponent, 
    ElementoPedidoComponent, 
    MostrarPedidoComponent, DatosEntregaPedidoComponent, DatosFacturacionPedidoComponent, DatosPagoPedidoComponent
  ],
  imports: 
  [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
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
