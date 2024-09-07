import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsisalumnoPageRoutingModule } from './asisalumno-routing.module';

import { AsisalumnoPage } from './asisalumno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsisalumnoPageRoutingModule
  ],
  declarations: [AsisalumnoPage]
})
export class AsisalumnoPageModule {}
