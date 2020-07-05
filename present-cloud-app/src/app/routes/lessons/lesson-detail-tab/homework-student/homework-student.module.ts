import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeworkStudentPageRoutingModule } from './homework-student-routing.module';

import { HomeworkStudentPage } from './homework-student.page';
import { HomeworkDetailPageModule } from './homework-detail/homework-detail.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeworkStudentPageRoutingModule,
    HomeworkDetailPageModule
  ],
  declarations: [HomeworkStudentPage]
})
export class HomeworkStudentPageModule {}
