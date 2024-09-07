import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsuetosPageRoutingModule } from './asuetos-routing.module';

import { AsuetosPage } from './asuetos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsuetosPageRoutingModule
  ],
  declarations: [AsuetosPage]
})
export class AsuetosPageModule {}
