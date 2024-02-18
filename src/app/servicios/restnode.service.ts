import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { IRestMessage } from '../modelos/restmessage';
import { ICategoria } from '../modelos/categoria';
import { ILibro } from '../modelos/libro';
import { IProvincia } from '../modelos/provincia';
import { IMunicipio } from '../modelos/municipio';
import { IPedido } from '../modelos/pedido';
import { IStorageService } from '../modelos/interfaceservicios';
import { IDireccion } from '../modelos/direccion';

@Injectable({
  providedIn: 'root',
})
export class RestnodeService {
  //servicio para poder hacer pet.rest a un serv.RESTFULL hecho con node.js
  //en el constructor se inyecta el servicio HttpClient
  //en el componente que se quiera usar este servicio se inyecta el servicio RestnodeService
  private baseUrl: string = 'http://localhost:5000/api/';
  constructor(@Inject('MI_TOKEN_SERVICIOSTORAGE') private storageSvc: IStorageService,private petAjax: HttpClient) {
    
  }
  //#region metodos para endpoints de cliente
  //Metodo para registrar cliente
  //Pasamos el formulario del componente de registro
  //Devuelve un observable
  public RegistroCliente(formulario: any): Observable<IRestMessage> {
    //El formulario se pasa como un objeto
    return this.petAjax.post<IRestMessage>(
      this.baseUrl + 'Cliente/Registro',
      formulario
    );
  }
  public async LoginCliente(credenciales: {
    email: string;
    password: string;
  }): Promise<IRestMessage> {
    return lastValueFrom(
      this.petAjax.post<IRestMessage>(
        this.baseUrl + 'Cliente/Login',
        credenciales,
        { headers: new HttpHeaders({ 'Content-Type': 'application/json' }
        
        ) },
        
      )
    );
  }
  public ComprobarEmail(email: string): Observable<IRestMessage> {
    return this.petAjax.get<IRestMessage>(
      this.baseUrl + 'Cliente/ComprobarEmail?email=' + email
    ) as Observable<IRestMessage>;
  }
  public ActivarCuenta(
    mode: string | null,
    oobCode: string | null,
    apiKey: string | null
  ): Observable<IRestMessage> {
    return this.petAjax.get<IRestMessage>(
      this.baseUrl +
        'Cliente/ActivarCuenta?mode=' +
        mode +
        '&oobCode=' +
        oobCode +
        '&apiKey=' +
        apiKey
    ) as Observable<IRestMessage>;
  }
  public RecuperarDatosCliente(email: string): Observable<IRestMessage> {
    return this.petAjax.get<IRestMessage>(
      this.baseUrl + 'Cliente/RecuperarDatosCliente/' + email
    ) as Observable<IRestMessage>;
  }
  public async UploadImagen(imagenBASE64:string, email: string): Promise<IRestMessage>  {
    return await lastValueFrom(
              this.petAjax.post<IRestMessage>(
                                                 'http://localhost:5000/api/Cliente/UploadImagen',
                                                 {imagen: imagenBASE64, emailcliente: email },
                                                 { headers: new HttpHeaders( {'Content-Type':'application/json'}) }
                                                 )
                              );
  }
  public async OperarDireccion(direccion:IDireccion, operacion:string, email:string ):  Promise<IRestMessage> {
    console.log('en servicio, metodo operardireccion, mandando...',{ direccion,operacion,email});

    return await lastValueFrom(
              this.petAjax.post<IRestMessage>(
                                                  'http://localhost:5000/api/Cliente/OperarDireccion',
                                                  { direccion, operacion, email },
                                                  { headers: new HttpHeaders( {'content-Type':'application/json'} ) }
                                                )
    );
  }
  //#endregion
  //#region metodos para endpoints de tienda
  public RecuperarCategorias(idcat: string): Observable<ICategoria[]> {
    if (!!idcat) idcat = 'padres';
    return this.petAjax.get(
      `${this.baseUrl}Tienda/RecuperarCategorias/${idcat}`
    ) as Observable<ICategoria[]>;
  }
  public RecuperarLibros(idcategoria: string): Observable<ILibro[]> {
    if (idcategoria == null) {
      idcategoria = '2-10';
    }
    return this.petAjax.get<ILibro[]>(
      `${this.baseUrl}Tienda/RecuperarLibros/${idcategoria}`
    );
  }
  public BuscarLibros(busqueda: string): Observable<ILibro[]> {
    return this.petAjax.get<ILibro[]>(
      `${this.baseUrl}Tienda/BuscarLibros/${busqueda}`
    );
  }
  public RecuperarLibro(isbn13: string): Observable<ILibro> {
    return this.petAjax.get<ILibro>(
      `${this.baseUrl}Tienda/RecuperarLibro/${isbn13}`
    ) as Observable<ILibro>;
  }

  //#endregion
  //#region metodos para endpoints de pedido
  public RecuperarProvincias(): Observable<IProvincia[]> {
    return this.petAjax.get<IProvincia[]>(
      `${this.baseUrl}Pedido/RecuperarProvincias`
    ) as Observable<IProvincia[]>;
  }

  public RecuperarMunicipios(cpro: string): Observable<IMunicipio[]> {
    return this.petAjax.get<IMunicipio[]>(
      `${this.baseUrl}Pedido/RecuperarMunicipios/${cpro}`
    ) as Observable<IMunicipio[]>;
  }
  public FinalizarPedido( pedido:IPedido, email:string):Promise<{url:string}>{
    let tokensesion = this.storageSvc.RecuperarJWT();
    return lastValueFrom(
                      this.petAjax
                          .post<{url:string}>(
                            "http://localhost:5000/api/Pedido/FinalizarPedido",
                            { pedido, email},
                            { headers: new HttpHeaders({'Content-Type':'application/json'}) }
                          )
                    );
  } 

  //#endregion
}
