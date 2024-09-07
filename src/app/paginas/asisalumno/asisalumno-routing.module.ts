import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsisalumnoPage } from './asisalumno.page';

const routes: Routes = [
  {
    path: '',
    component: AsisalumnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsisalumnoPageRoutingModule {}
