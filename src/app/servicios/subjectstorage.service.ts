import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICliente } from '../modelos/cliente';
import { IStorageService } from '../modelos/interfaceservicios';
import { IPedido } from '../modelos/pedido';
import { ILibro } from '../modelos/libro';
import { IDireccion } from '../modelos/direccion';
import { IDatosPago } from '../modelos/datospago';

@Injectable({
  providedIn: 'root',
})
export class SubjectstorageService implements IStorageService {
  private _clienteSubject$ = new BehaviorSubject<ICliente |null>(null);
  private _jwtSubject$ = new BehaviorSubject<string>("");
  private _elementosPedidoSubject$:BehaviorSubject<
    { libroElemento:ILibro, cantidadElemento:number}[]> = new BehaviorSubject<{ libroElemento:ILibro, cantidadElemento:number}[]>( [] );
  private _datosPagoSubject$ = new BehaviorSubject<IDatosPago>({}as IDatosPago);
  constructor() {}
  RecuperarDatosCliente(): Observable<ICliente | null> {
    return this._clienteSubject$.asObservable();
  }
  RecuperarJWT(): Observable<string> {
    return this._jwtSubject$.asObservable();
  }
  RecuperarElementosPedido(): Observable<{ libroElemento: ILibro; cantidadElemento: number; }[]> {
    return this._elementosPedidoSubject$.asObservable();
  }
  RecuperarDatosPago(): Observable<IDatosPago> {
    return this._datosPagoSubject$.asObservable();
  }
  AlmacenarDatosCLiente(datoscliente: ICliente): void {
    this._clienteSubject$.next(datoscliente);
  }
  AlmacenarJWT(jwt: string): void {
    this._jwtSubject$.next(jwt);
  }
  AlmacenarDatosPago(datosPago: IDatosPago): void {
    this._datosPagoSubject$.next(datosPago);
  }
  OperarElementosPedido(libro: ILibro, operacion: string): void {
    switch (operacion) {
      case 'agregar':
        this.AgregarElementoPedido(libro);
        break;
      case 'borrar':
        this.BorrarElementoPedido(libro);
        break;
      case 'restar':
        this.RestarElementoPedido(libro);
        break;
    }
    this._elementosPedidoSubject$.next(this._elementosPedidoSubject$.value);
  }
  private AgregarElementoPedido(libro: ILibro): void {
    // Buscar si el libro ya existe en el pedido
    const posElem = this._elementosPedidoSubject$.value.findIndex(
      (elem) => elem.libroElemento.ISBN13 === libro.ISBN13
    );
    if (posElem !== -1) {
      this._elementosPedidoSubject$.value[posElem].cantidadElemento++;
    } else {
      this._elementosPedidoSubject$.value.push({
        libroElemento: libro,
        cantidadElemento: 1,
      });
    }
  }
  private BorrarElementoPedido(libro: ILibro): void {
    const posElem = this._elementosPedidoSubject$.value.findIndex(
      (elem) => elem.libroElemento.ISBN13 === libro.ISBN13
    );
    if (posElem !== -1) {
      this._elementosPedidoSubject$.value.splice(posElem, 1);
    }
  }
  private RestarElementoPedido(libro: ILibro): void {
    const posElem = this._elementosPedidoSubject$.value.findIndex(
      (elem) => elem.libroElemento.ISBN13 === libro.ISBN13
    );
    if (posElem !== -1) {
      this._elementosPedidoSubject$.value[posElem].cantidadElemento--;
      if (this._elementosPedidoSubject$.value[posElem].cantidadElemento <= 0) {
        this._elementosPedidoSubject$.value.splice(posElem, 1);
      }
    }
  }
}
