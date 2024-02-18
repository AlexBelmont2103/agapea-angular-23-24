import { Component, Inject, Input } from '@angular/core';
import { IPedido } from '../../../modelos/pedido';
import { Router } from '@angular/router';
import { IStorageService } from '../../../modelos/interfaceservicios';
import { ILibro } from '../../../modelos/libro';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-mini-pedido',
  templateUrl: './mini-pedido.component.html',
  styleUrl: './mini-pedido.component.css'
})
export class MiniPedidoComponent {
@Input() pedido?: IPedido;

constructor(@Inject('MI_TOKEN_SERVICIOSTORAGE') private storageSvc: IStorageService, private router: Router) {

}
addLibroPedido(libro: ILibro){
  this.storageSvc.OperarElementosPedido(libro, 'agregar');
  this.router.navigateByUrl('/Tienda/MostrarPedido');
}
generarFacturaPedido() {
  const doc = new jsPDF();
  doc.text(`Factura del pedido: ${this.pedido?.idPedido}`, 10, 10);
  doc.text('Libros:', 10, 20);
  let y = 30;
  this.pedido?.elementosPedido.forEach((elemento) => {
    doc.text(elemento.libroElemento.Titulo, 10, y);
    y += 10;
    doc.text(`Cantidad: ${elemento.cantidadElemento}`, 10, y);
    y += 10;
    doc.text(`Precio: ${elemento.libroElemento.Precio}`, 10, y);
    y += 10;
  });
  y += 10;
  doc.text(`Total: ${this.pedido?.totalPedido}`, 10, y);
  doc.save('FacturaPedido.pdf');
}
}
