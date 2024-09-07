import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClasesalumnosPageRoutingModule } from './clasesalumnos-routing.module';

import { ClasesalumnosPage } from './clasesalumnos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClasesalumnosPageRoutingModule
  ],
  declarations: [ClasesalumnosPage]
})
export class ClasesalumnosPageModule {}
