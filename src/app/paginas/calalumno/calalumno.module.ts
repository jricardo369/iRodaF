import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalalumnoPageRoutingModule } from './calalumno-routing.module';

import { CalalumnoPage } from './calalumno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalalumnoPageRoutingModule
  ],
  declarations: [CalalumnoPage]
})
export class CalalumnoPageModule {}
