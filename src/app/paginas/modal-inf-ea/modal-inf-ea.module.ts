import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalInfEaPageRoutingModule } from './modal-inf-ea-routing.module';

import { ModalInfEaPage } from './modal-inf-ea.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalInfEaPageRoutingModule
  ],
  declarations: [ModalInfEaPage]
})
export class ModalInfEaPageModule {}
