import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalalumnoPage } from './calalumno.page';

const routes: Routes = [
  {
    path: '',
    component: CalalumnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalalumnoPageRoutingModule {}
