import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddLessonPageRoutingModule } from './add-lesson-routing.module';

import { AddLessonPage } from './add-lesson.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddLessonPageRoutingModule
  ],
  declarations: [AddLessonPage]
})
export class AddLessonPageModule {}
