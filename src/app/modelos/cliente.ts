import { ICredenciales } from "./credenciales";
import { IDireccion } from "./direccion";
import { IPedido } from "./pedido";

export interface ICliente {
    nombre: string,
    apellidos: string,
    cuenta: ICredenciales,
    telefono: string,
    direccionesCliente?: IDireccion[],
    pedidosCliente?: IPedido[],
    genero?: string,
    fechaNacimiento?: Date,
    descripcion?: string,
}