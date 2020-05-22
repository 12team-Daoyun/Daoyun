import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeworkPageRoutingModule } from './homework-routing.module';

import { HomeworkPage } from './homework.page';
import { AddHomeworkPage } from './add-homework/add-homework.page';
import { AddHomeworkPageModule } from './add-homework/add-homework.module';
import { HomeworkDetailPage } from './homework-detail/homework-detail.page';
import { HomeworkDetailPageModule } from './homework-detail/homework-detail.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeworkPageRoutingModule,
    AddHomeworkPageModule,
    HomeworkDetailPageModule
  ],
  declarations: [HomeworkPage]
})
export class HomeworkPageModule {}
