import { IDireccion } from "./direccion";

export interface IDatosPago {
    tipodireccionenvio: string;
    direccionPrincipal: IDireccion;
    //Datos envío
    direccionEnvio: IDireccion;
    nombreEnvio: string;
    apellidosEnvio: string;
    telefonoEnvio: string;
    emailEnvio: string;

    //Datos de facturación
    tipoFactura: string;
    nombreFactura: string;
    docfiscalFactura: string;

    //Datos pago
    metodoPago: string;
    numeroTarjeta?: string;
    nombreBanco?: string;
    mesCaducidad?: string;
    anioCaducidad?: string;
    cvv?: string;
}