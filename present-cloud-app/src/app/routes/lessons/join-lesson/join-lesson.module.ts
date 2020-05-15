import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JoinLessonPageRoutingModule } from './join-lesson-routing.module';

import { JoinLessonPage } from './join-lesson.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JoinLessonPageRoutingModule
  ],
  declarations: [JoinLessonPage]
})
export class JoinLessonPageModule {}
