import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarclasePageRoutingModule } from './editarclase-routing.module';

import { EditarclasePage } from './editarclase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarclasePageRoutingModule
  ],
  declarations: [EditarclasePage]
})
export class EditarclasePageModule {}
