import { InjectionToken } from "@angular/core";
import { IStorageService } from "../modelos/interfaceservicios";

export const MI_TOKEN_SERVICIOSTORAGE = new InjectionToken<IStorageService>('ClaveStorageServices');
//el string del constructor InjectionToken es la "clave" con la que se van a identificar en el
//modulo de DI todos los servicios que implementen la interface IStorageService

//Cuando un componente solicite al DI la inyeccion de un servicio que implemente la interface IStorageService
//necesita esa constante