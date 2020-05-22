import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformatinoFeedbackSettingMinePageRoutingModule } from './informatino-feedback-setting-mine-routing.module';

import { InformatinoFeedbackSettingMinePage } from './informatino-feedback-setting-mine.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformatinoFeedbackSettingMinePageRoutingModule
  ],
  declarations: [InformatinoFeedbackSettingMinePage]
})
export class InformatinoFeedbackSettingMinePageModule {}
