import { Component } from '@angular/core';
import { RestnodeService } from '../../../servicios/restnode.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription, concatMap, tap } from 'rxjs';
import { IRestMessage } from '../../../modelos/restmessage';

@Component({
  selector: 'app-registrook',
  templateUrl: './registrook.component.html',
  styleUrl: './registrook.component.css'
})
export class RegistrookComponent {
  private paramsSubscriptor!: Subscription;
  constructor(private restSvc:RestnodeService, private router:Router, private activatedRoute:ActivatedRoute){

  }
  ngOnDestroy(): void {
    this.paramsSubscriptor.unsubscribe();
  }

  ngOnInit(): void {
    /*
      La url que se manda desde firebase tiene este formato:
      http://localhost:4200/Cliente/RegistroOk ? mode=verifyEmail &
                                                  oobCode= codigo &
                                                  apiKey = ...
    
      Cómo extraigo parametros de la url en angular? Hacer un metodo en el servicio de angular RestNodeService
      llamado ActivarEmail donde le pasemos estos parametros

      ---Extraer parametros de la instantena de la ruta en el instante de carga del componente:
      let _mode: string | null = this.activatedRoute.snapshot.queryParamMap.get('mode');
      let _oobCode: string | null = this.activatedRoute.snapshot.queryParamMap.get('oobCode');
      let _apiKey: string | null = this.activatedRoute.snapshot.queryParamMap.get('apiKey');

      let _resp:IRestMessage = this.restSvc.ActivarCuenta(_mode, _oobCode, _apiKey);

      --Usando parametros obtenidos del observable que nos da el servicio ActivadeRoute (detecta cambios en la url)
      {
        next:(dato)=>{}, <----- generalmente, solo se pone esta en la subscription
        error:(error)=>{},
        complete:()=>{}
      }


      para manejar observables anidados, se usan operadores de rxjs como mergeMap, switchMap, concatMap, exhaustMap

      this.paramsSubscriptor = this.activatedRoute.queryParamMap.subscribe(
        (parametros:ParamMap)=>{
          let _mode: string | null = parametros.get('mode');
          let _oobCode: string | null = parametros.get('oobCode');
          let _apiKey: string | null = parametros.get('apiKey');

          this.restSvc.ActivarCuenta(_mode, _oobCode, _apiKey).subscribe(
            (resp:IRestMessage)=>{
              if(resp.codigo ==0){
                //redirigir al login
                this.router.navigateByURL('/Cliente/Login');
              }else{
                //mostrar mensaje de error en la vista
              }
        }
      )
    */
   this.paramsSubscriptor = this.activatedRoute.queryParamMap.pipe(
                                                      tap((parametros:ParamMap)=>console.log('parametros en la url....',parametros.keys)),
                                                      concatMap((parametros:ParamMap)=>{
                                                        let _mode: string | null = parametros.get('mode');
                                                        let _oobCode: string | null = parametros.get('oobCode');
                                                        let _apiKey: string | null = parametros.get('apiKey');
                                                        return this.restSvc.ActivarCuenta(_mode, _oobCode, _apiKey);
                                                      })
                                                   ).subscribe((resp:IRestMessage)=>{
                                                    if(resp.codigo == 0){
                                                      //redirigir al login
                                                      this.router.navigateByUrl('/Cliente/Login');
                                                    }else{
                                                      //mostrar mensaje de error en la vista
                                                    }
                                                   });
  }
}
