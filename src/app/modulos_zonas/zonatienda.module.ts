import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZonatiendaRoutingModule } from './zonatienda-routing.module';
import { DatosEntregaPedidoComponent } from '../componentes/zonaPedido/datosEntregaPedidoComponent/datos-entrega-pedido.component';
import { DatosFacturacionPedidoComponent } from '../componentes/zonaPedido/datosFacturacionPedidoComponent/datos-facturacion-pedido.component';
import { DatosPagoPedidoComponent } from '../componentes/zonaPedido/datosPagoPedidoComponent/datos-pago-pedido.component';
import { ElementoPedidoComponent } from '../componentes/zonaPedido/elementoPedidoComponent/elemento-pedido.component';
import { MostrarPedidoComponent } from '../componentes/zonaPedido/mostrarPedidoComponent/mostrar-pedido.component';
import { DetalleslibroComponent } from '../componentes/zonaTienda/detallesLibroComponent/detalleslibro.component';
import { LibrosComponent } from '../componentes/zonaTienda/librosComponent/libros.component';
import { MinilibroComponent } from '../componentes/zonaTienda/miniLibroComponent/minilibro.component';
import { RedondeocantidadPipe } from '../pipes/redondeocantidad.pipe';


@NgModule({
  declarations: [
    RedondeocantidadPipe, 
    LibrosComponent, 
    MinilibroComponent, 
    DetalleslibroComponent, 
    ElementoPedidoComponent, 
    MostrarPedidoComponent, 
    DatosEntregaPedidoComponent, 
    DatosFacturacionPedidoComponent, 
    DatosPagoPedidoComponent,
  ],
  imports: [
    CommonModule,
    ZonatiendaRoutingModule
  ]
})
export class ZonatiendaModule { }
