import { Observable } from "rxjs";
import { ICliente } from "./cliente";
import { ILibro } from "./libro";
import { IPedido } from "./pedido";
import { IDatosPago } from "./datospago";

export interface IStorageService{
    //#region metodos SINCRONOS para servicios localstorage, subjectstorage
    AlmacenarDatosCLiente(datoscliente:ICliente):void;
    AlmacenarJWT(jwt:string):void;
    RecuperarJWT():Observable<string>;
    RecuperarDatosCliente():Observable<ICliente | null>| ICliente | null;
    OperarElementosPedido(libro:ILibro, operacion:string):void;
    RecuperarElementosPedido():Observable<{ libroElemento: ILibro; cantidadElemento: number; }[]> | { libroElemento: ILibro; cantidadElemento: number; }[];
    //#endregion

    //#region metodos ASINCRONOS para servicios indexedDB

    //#endregion
}