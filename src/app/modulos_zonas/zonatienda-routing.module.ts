import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MostrarPedidoComponent } from '../componentes/zonaPedido/mostrarPedidoComponent/mostrar-pedido.component';
import { DetalleslibroComponent } from '../componentes/zonaTienda/detallesLibroComponent/detalleslibro.component';
import { LibrosComponent } from '../componentes/zonaTienda/librosComponent/libros.component';
import { AccesoPedidoGuard } from '../servicios_GUARDS/acceso-pedido.guard';
import { PedidoFinalizadoComponent } from '../componentes/zonaPedido/pedidoFinalizadoComponent/pedido-finalizado.component';

const routes: Routes = [
  {path:'Libros/:idcat', component: LibrosComponent},
  {path:'MostrarLibro/:isbn13', component: DetalleslibroComponent},
  {path:'MostrarPedido', component: MostrarPedidoComponent, canActivate:[AccesoPedidoGuard]},
  {path:'PedidoFinalizado', component: PedidoFinalizadoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZonatiendaRoutingModule { }
