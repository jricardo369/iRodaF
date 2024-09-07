import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsistenciasusuarioPage } from './asistenciasusuario.page';

const routes: Routes = [
  {
    path: '',
    component: AsistenciasusuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsistenciasusuarioPageRoutingModule {}
