import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambiarpassPageRoutingModule } from './cambiarpass-routing.module';

import { CambiarpassPage } from './cambiarpass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambiarpassPageRoutingModule
  ],
  declarations: [CambiarpassPage]
})
export class CambiarpassPageModule {}
