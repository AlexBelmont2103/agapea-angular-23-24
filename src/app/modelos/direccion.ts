import { IMunicipio } from "./municipio";
import { IProvincia } from "./provincia";

export interface IDireccion{
    calle: string,
    idDireccion?: string,
    cp: string,
    pais: string,
    provincia: IProvincia,
    municipio: IMunicipio,
    esPrincipal?: boolean,
    esFacturacion?: boolean,
}