import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsistenciasusuarioPageRoutingModule } from './asistenciasusuario-routing.module';

import { AsistenciasusuarioPage } from './asistenciasusuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsistenciasusuarioPageRoutingModule
  ],
  declarations: [AsistenciasusuarioPage]
})
export class AsistenciasusuarioPageModule {}
