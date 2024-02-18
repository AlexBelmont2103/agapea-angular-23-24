import { Component, Inject } from '@angular/core';
import { NavigationStart, Router, RouterEvent } from '@angular/router';
import { Observable, filter, map, tap } from 'rxjs';
import { ICliente } from './modelos/cliente';
import { SubjectstorageService } from './servicios/subjectstorage.service';
import { IStorageService } from './modelos/interfaceservicios';
import { ILibro } from './modelos/libro';
import { RestnodeService } from './servicios/restnode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'agapea-angular-23-24';
  public showPanel: string = ''; //<= 'panelCliente' si la ruta es /Cliente/Panel
  // 'panelTienda' si la ruta es /Tienda
  // '' si la ruta es /Cliente/Login o /Cliente/Registro
  public routerEvents$: Observable<RouterEvent>;
  public patron: RegExp = new RegExp(
    '(/Cliente/(Login|Registro)|/Tienda/MostrarPedido)'
  );
  public clientelogged: Observable<ICliente | null>;
  public tokenSesion!: Observable<string>;
  public listaItems$!: Observable<
    { libroElemento: ILibro; cantidadElemento: number }[]
  >;
  public numItems$!: Observable<number>;
  public subtotalPedido$!: Observable<number>;
  public librosBusqueda: ILibro[] = [];
  onBusqueda(busqueda: string) {
    if(busqueda.length <=0){
      this.librosBusqueda = [];
      return;
    }
    this.restSvc.BuscarLibros(busqueda).subscribe(libros => {
      this.librosBusqueda = libros;
    });
  }
  constructor(
    private router: Router,
    @Inject('MI_TOKEN_SERVICIOSTORAGE') private storageSvc: IStorageService,
    private restSvc: RestnodeService
  ) {
    this.clientelogged = this.storageSvc.RecuperarDatosCliente();
    this.tokenSesion = this.storageSvc.RecuperarJWT();
    this.listaItems$ = this.storageSvc.RecuperarElementosPedido();
    this.numItems$= this.listaItems$.pipe(
      //Por cada item, sumamos la cantidad
      map((items) => items.reduce((acc, item) => acc + item.cantidadElemento, 0))
    );
    this.subtotalPedido$ = this.listaItems$.pipe(
      //Por cada item, sumamos el precio por la cantidad
      map((items) => items.reduce((acc, item) => acc + item.libroElemento.Precio * item.cantidadElemento, 0))
    );
    this.routerEvents$ = router.events.pipe(
      //tap((ev) => console.log(ev)),
      map((ev) => ev as RouterEvent),
      filter((ev, i) => ev instanceof NavigationStart)
    );

    //Si cambia la url, compruebo si es /Cliente/Panel o /Tienda
    //y muestro el panel correspondiente
    this.routerEvents$.subscribe((ev) => {
      if (ev.url.includes('/Cliente/Panel')) {
        this.showPanel = 'panelCliente';
      } else if (ev.url.includes('/Tienda')) {
        this.showPanel = 'panelTienda';
      } else {
        this.showPanel = '';
      }
    });
    
  }

  /*
    router.events.subscribe(
      (ev)=>{
        if(ev instanceof NavigationStart){
          console.log(ev.url);
          if(ev.url.includes('/Cliente/Panel')){
            this.showPanel = 'panelCliente';
          }else if(ev.url.includes('/Tienda')){
            this.showPanel = 'panelTienda';
          }else{
            this.showPanel = '';
          }
        }
      }
    )
    */
}
