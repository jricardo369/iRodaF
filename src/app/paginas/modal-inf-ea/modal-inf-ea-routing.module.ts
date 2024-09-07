import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalInfEaPage } from './modal-inf-ea.page';

const routes: Routes = [
  {
    path: '',
    component: ModalInfEaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalInfEaPageRoutingModule {}
