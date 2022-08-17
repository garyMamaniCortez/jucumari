import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LandigPageRoutingModule } from './landig-routing.module';

import { LandigPage } from './landig.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LandigPageRoutingModule
  ],
  declarations: [LandigPage]
})
export class LandigPageModule {}
