import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsuetosPage } from './asuetos.page';

const routes: Routes = [
  {
    path: '',
    component: AsuetosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsuetosPageRoutingModule {}
