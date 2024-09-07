import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoasuetoPageRoutingModule } from './nuevoasueto-routing.module';

import { NuevoasuetoPage } from './nuevoasueto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevoasuetoPageRoutingModule
  ],
  declarations: [NuevoasuetoPage]
})
export class NuevoasuetoPageModule {}
