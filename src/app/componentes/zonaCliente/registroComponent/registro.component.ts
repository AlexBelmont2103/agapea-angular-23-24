import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { compareToValidator } from '../../../validators/compareTo';
import { RestnodeService } from '../../../servicios/restnode.service';
import { Observable, Subscription } from 'rxjs';
import { IRestMessage } from '../../../modelos/restmessage';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent {
  public miForm: FormGroup;
  private obvservableRegistro: Observable<IRestMessage>;
  private suscripcionRegistro: Subscription;
  //Inyectar el servicio RestnodeService
  
  
  constructor(private restnodeService:RestnodeService) {
    this.obvservableRegistro = new Observable<IRestMessage>();
    this.suscripcionRegistro = new Subscription();
    this.miForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      //Añadir validador asíncrono al email para comprobar que el email no existe en la BD
      repemail: new FormControl('', [
        Validators.required,
        Validators.email,
        //Validar que el email y el repemail sean iguales
        compareToValidator('email'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$'),
      ]),
      repassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$'),
        compareToValidator('password'),
      ]),
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
        Validators.pattern('^[a-zA-Z]+$'),
      ]),
      apellidos: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      login: new FormControl('', [
        Validators.minLength(3),
        Validators.maxLength(25),
        //El pattern permite letras y numeros
        
      ]),
      telefono: new FormControl('', [
        Validators.pattern('^[0-9]{9}$'),
      ]),
    });
  }

  //Metodo para registrar cliente
  public registrarCliente(): void {
    console.log('Registro cliente');
    console.log(this.miForm.value);
    //Llamar al servicio RestnodeService
    this.obvservableRegistro = this.restnodeService.RegistroCliente(this.miForm.value);
    this.suscripcionRegistro = this.obvservableRegistro.subscribe((datos) => {console.log(datos);})
  }
  ngOnDestroy() {
    this.suscripcionRegistro.unsubscribe();
  }
}