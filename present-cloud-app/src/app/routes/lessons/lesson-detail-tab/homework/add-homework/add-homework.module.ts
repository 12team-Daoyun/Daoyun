import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddHomeworkPageRoutingModule } from './add-homework-routing.module';

import { AddHomeworkPage } from './add-homework.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddHomeworkPageRoutingModule
  ],
  exports: [AddHomeworkPage],
  declarations: [AddHomeworkPage]
})
export class AddHomeworkPageModule {}
