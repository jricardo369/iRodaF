import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearpaquetePage } from './crearpaquete.page';

const routes: Routes = [
  {
    path: '',
    component: CrearpaquetePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearpaquetePageRoutingModule {}
