//Validador síncrono para comparar si dos campos son iguales
//Si coincide, no devuelve error
//Si no coincide, devuelve error
import { AbstractControl,  ValidatorFn } from '@angular/forms';

export function compareToValidator(idControlAComparar: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const valorControl: string = control.value;
    const valorAComparar: string = control.parent?.get(idControlAComparar)?.value;
    if (valorControl === valorAComparar) {
      return null;
    } else{
        //Validacion errónea, no coinciden valores...
        return { 'compareTo': true };
    }
  };
}