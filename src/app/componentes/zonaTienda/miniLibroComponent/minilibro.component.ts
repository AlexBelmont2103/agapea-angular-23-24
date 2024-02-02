import { Component, Inject, Input } from '@angular/core';
import { ILibro } from '../../../modelos/libro';
import { IStorageService } from '../../../modelos/interfaceservicios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-minilibro',
  templateUrl: './minilibro.component.html',
  styleUrl: './minilibro.component.css'
})
export class MinilibroComponent {
  @Input() public libro!: ILibro;


  constructor(@Inject('MI_TOKEN_SERVICIOSTORAGE') private storageSvc: IStorageService, private router: Router) {

   }

  AddLibroPedido():void{
    console.log('Libro comprado');
    this.storageSvc.OperarElementosPedido(this.libro, 'agregar');
    this.router.navigateByUrl('/Tienda/MostrarPedido');
  }
}
