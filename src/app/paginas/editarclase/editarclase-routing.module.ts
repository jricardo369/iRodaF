import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarclasePage } from './editarclase.page';

const routes: Routes = [
  {
    path: '',
    component: EditarclasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarclasePageRoutingModule {}
