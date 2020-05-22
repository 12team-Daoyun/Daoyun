import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeworkDetailPageRoutingModule } from './homework-detail-routing.module';

import { HomeworkDetailPage } from './homework-detail.page';
import { ScorePageModule } from './score/score.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeworkDetailPageRoutingModule
  ],
  declarations: [HomeworkDetailPage]
})
export class HomeworkDetailPageModule {}
