import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevoasuetoPage } from './nuevoasueto.page';

const routes: Routes = [
  {
    path: '',
    component: NuevoasuetoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevoasuetoPageRoutingModule {}
