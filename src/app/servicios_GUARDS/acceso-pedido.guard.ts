import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, concatMap, last, map, of, tap } from 'rxjs';
import { IStorageService } from '../modelos/interfaceservicios';
import { ICliente } from '../modelos/cliente';


@Injectable({
  providedIn: 'root'
})
export class AccesoPedidoGuard implements CanActivate {
  private _obsAcceso: Observable<boolean | UrlTree> = of(true);
  constructor(@Inject('MI_TOKEN_SERVICIOSTORAGE') private storageSvc: IStorageService,
  private router:Router){

  }
  canActivate(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this._obsAcceso= this.storageSvc
        .RecuperarDatosCliente()
        .pipe(
          tap((datos:ICliente | null)=>{console.log('Datos pasados desde el guard',datos)}),
          concatMap((datos) => {
            if(datos != null){
               //Le damos el valor true al observable
                return of(true);
            }else {
              //Le damos el valor false al observable
               return of(this.router.createUrlTree(['/Cliente/Login']));
            }
          }),
          
        );
        return this._obsAcceso;
    }
  
}
