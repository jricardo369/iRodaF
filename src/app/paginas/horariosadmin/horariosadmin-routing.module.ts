import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HorariosadminPage } from './horariosadmin.page';

const routes: Routes = [
  {
    path: '',
    component: HorariosadminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HorariosadminPageRoutingModule {}
