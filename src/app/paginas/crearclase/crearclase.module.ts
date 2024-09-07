import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearclasePageRoutingModule } from './crearclase-routing.module';

import { CrearclasePage } from './crearclase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearclasePageRoutingModule
  ],
  declarations: [CrearclasePage]
})
export class CrearclasePageModule {}
