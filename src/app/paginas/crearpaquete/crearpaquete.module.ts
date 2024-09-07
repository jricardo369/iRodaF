import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearpaquetePageRoutingModule } from './crearpaquete-routing.module';

import { CrearpaquetePage } from './crearpaquete.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearpaquetePageRoutingModule
  ],
  declarations: [CrearpaquetePage]
})
export class CrearpaquetePageModule {}
