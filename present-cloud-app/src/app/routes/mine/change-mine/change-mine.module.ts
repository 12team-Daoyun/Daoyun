import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeMinePageRoutingModule } from './change-mine-routing.module';

import { ChangeMinePage } from './change-mine.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangeMinePageRoutingModule
  ],
  declarations: [ChangeMinePage]
})
export class ChangeMinePageModule {}
