import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro',
})
export class FiltroPipe implements PipeTransform {
  transform(
    arreglo: any[], 
    texto: string,
    // columna:string = 'nombre'
    ): any[] {

    if (texto === '') {
      return arreglo;
    }
    if (!arreglo) {
      return arreglo;
    }

    texto = texto.toLowerCase();

    return arreglo.filter((item) => {
      return item.nombre.toLowerCase().includes(texto);
    });
  }
}
