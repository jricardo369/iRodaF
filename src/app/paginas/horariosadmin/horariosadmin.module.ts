import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HorariosadminPageRoutingModule } from './horariosadmin-routing.module';

import { HorariosadminPage } from './horariosadmin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HorariosadminPageRoutingModule
  ],
  declarations: [HorariosadminPage]
})
export class HorariosadminPageModule {}
