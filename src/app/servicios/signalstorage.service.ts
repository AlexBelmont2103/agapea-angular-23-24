import { Injectable, signal } from '@angular/core';
import { IStorageService } from '../modelos/interfaceservicios';
import { Observable } from 'rxjs';
import { ICliente } from '../modelos/cliente';
import { ILibro } from '../modelos/libro';

@Injectable({
  providedIn: 'root'
})
export class SignalstorageService implements IStorageService{
  private _clienteSignal= signal<ICliente| null>(null);
  private _jwtSignal= signal<string>("");
  constructor() { }
  AlmacenarDatosCLiente(datoscliente: ICliente): void {
    this._clienteSignal.update(()=> datoscliente);
  }
  AlmacenarJWT(jwt: string): void {
    throw new Error('Method not implemented.');
  }
  RecuperarJWT(): Observable<string> {
    throw new Error('Method not implemented.');
  }
  RecuperarDatosCliente(): Observable<ICliente | null> | ICliente | null{
    return this._clienteSignal();
  }
  OperarElementosPedido(libro: ILibro, operacion: string): void {
    throw new Error('Method not implemented.');
  }
  RecuperarElementosPedido(): Observable<{ libroElemento: ILibro; cantidadElemento: number; }[]> {
    throw new Error('Method not implemented.');
  }
}
