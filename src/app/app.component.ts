import { Component, Inject } from '@angular/core';
import { NavigationStart, Router, RouterEvent } from '@angular/router';
import { Observable, filter, map, tap } from 'rxjs';
import { ICliente } from './modelos/cliente';
import { SubjectstorageService } from './servicios/subjectstorage.service';
import { IStorageService } from './modelos/interfaceservicios';
import { ILibro } from './modelos/libro';

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
  public numItems: number = 0;
  public subtotalPedido: number = 0;
  constructor(
    private router: Router,
    @Inject('MI_TOKEN_SERVICIOSTORAGE') private storageSvc: IStorageService
  ) {
    this.clientelogged = this.storageSvc.RecuperarDatosCliente();
    this.tokenSesion = this.storageSvc.RecuperarJWT();
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
