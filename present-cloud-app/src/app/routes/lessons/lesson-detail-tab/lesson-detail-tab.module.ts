import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LessonDetailTabPageRoutingModule } from './lesson-detail-tab-routing.module';

import { LessonDetailTabPage } from './lesson-detail-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LessonDetailTabPageRoutingModule
  ],
  declarations: [LessonDetailTabPage]
})
export class LessonDetailTabPageModule {}
