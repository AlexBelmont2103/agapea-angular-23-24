import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ILibro } from '../../../modelos/libro';

@Component({
  selector: 'app-elemento-pedido',
  templateUrl: './elemento-pedido.component.html',
  styleUrl: './elemento-pedido.component.css'
})
export class ElementoPedidoComponent {
  @Input() public elemento!:{libroElemento:ILibro, cantidadElemento:number};
  @Output() public operarItemEvent:EventEmitter< [ {libroElemento:ILibro, cantidadElemento:number}, string ] >=new EventEmitter< [ {libroElemento:ILibro, cantidadElemento:number}, string ] >();
  operarItem(tipoOperacion:string){
    this.operarItemEvent.emit([this.elemento, tipoOperacion]);
  }
  agregarItem(){
    this.elemento.cantidadElemento++;
  }
  borrarItem(){
    this.elemento.cantidadElemento=0;
  }
  restarItem(){
    if(this.elemento.cantidadElemento>0){
      this.elemento.cantidadElemento--;
    }else{
      this.borrarItem();
    }
  }

}
