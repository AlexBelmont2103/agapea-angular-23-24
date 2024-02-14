import { IDatosPago } from "./datospago";
import { ILibro } from "./libro";

export interface IPedido {
    idPedido: string,
    fechaPedido: Date,
    estadoPedido: string,
    elementosPedido: Array< {libroElemento: ILibro, cantidadElemento:number} >,
    subtotalPedido: number,
    gastosEnvioPedido: number,
    totalPedido: number,
    datosPago:IDatosPago
}