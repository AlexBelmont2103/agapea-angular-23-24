import { Injectable } from "@angular/core";
import { ICliente } from "../modelos/cliente";

@Injectable({
  providedIn: "root"
})

export class IndexedDBService{
    private db!: IDBDatabase;

    constructor(){
        const _req = indexedDB.open("AgapeaAngular", 1);
        _req.onupgradeneeded = (event: IDBVersionChangeEvent) => {
            this.db = (event.target as IDBOpenDBRequest).result;
            if (!this.db.objectStoreNames.contains('datosclientes')) {
              this.db.createObjectStore('datosclientes', { keyPath: 'email' });
            }
            if (!this.db.objectStoreNames.contains('tokens')) {
              this.db.createObjectStore('tokens', { keyPath: 'email' });
            }
          };
        
          _req.onsuccess = (event: Event) => {
            this.db = (event.target as IDBOpenDBRequest).result;
          };
    }
    async almacenarDatosCliente(cliente: ICliente) {
        const transaccion: IDBTransaction = this.db.transaction('datosclientes', 'readwrite');
        const almacen: IDBObjectStore = transaccion.objectStore('datosclientes');
        await almacen.add({'email': cliente.cuenta.email, 'cliente': cliente});
    }
    async almacenarTokenCliente(cliente: ICliente, token: string){
        const transaccion: IDBTransaction = this.db.transaction('tokens', 'readwrite');
        const almacen: IDBObjectStore = transaccion.objectStore('tokens');
        await almacen.add({'email': cliente.cuenta.email, 'token': token});
    }
}