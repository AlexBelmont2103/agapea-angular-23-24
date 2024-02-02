import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'redondeocantidad'
})
export class RedondeocantidadPipe implements PipeTransform {
  // Pipe usada para redondeo de valores numericos
  // Como parametro tiene el número de decimales que quieres redondear
  //{value | redondeocantidad:2}
  transform(value: number, numeroDecimales: number): number {
    console.log('Valor pasado y numero de decimales: ', { value, numeroDecimales });
    return parseFloat(value.toFixed(numeroDecimales));
  }
}
