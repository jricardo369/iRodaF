import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CaladminPage } from './caladmin.page';

const routes: Routes = [
  {
    path: '',
    component: CaladminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaladminPageRoutingModule {}
