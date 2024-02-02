import { Component } from '@angular/core';
import { ILibro } from '../../../modelos/libro';
import { RestnodeService } from '../../../servicios/restnode.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrl: './libros.component.css'
})
export class LibrosComponent {
  public listaLibros$: Observable<ILibro[]> = new Observable<ILibro[]>();

  constructor(private restSvc: RestnodeService,
              private activatedRoute: ActivatedRoute) {
    // Recuperamos de la url el segmento donde va el idcat de los libros a recuperar
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      let idcat:string | null = params.get('idcat');
      if(idcat == null){
        idcat = '2-10';
      }
      this.listaLibros$ = this.restSvc.RecuperarLibros(idcat);
    });
  }
}
