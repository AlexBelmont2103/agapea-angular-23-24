import { Injectable, Inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IStorageService } from '../modelos/interfaceservicios';

@Injectable()
export class AuthjwtInterceptor implements HttpInterceptor {
  //Interceptor para añadir el token de autenticacion a las peticiones http
  //Authetication: Bearer token
  //Si no hay jwt almacenado, no cambio pet. original
  constructor(@Inject('MI_TOKEN_SERVICIOSTORAGE') private storageSvc: IStorageService) {

  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.storageSvc.RecuperarJWT().subscribe(
      jwt => {
        if (jwt) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${jwt}`
            }
          });
        }
      }
    );
    return next.handle(request);
  }
}
