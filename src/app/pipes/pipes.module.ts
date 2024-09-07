import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroPipe } from './filtro.pipe';
import { BuscarPipe } from './buscar.pipe';



@NgModule({
  declarations: [
    FiltroPipe,
    BuscarPipe
  ],
  exports: [BuscarPipe,FiltroPipe]
})
export class PipesModule { }
