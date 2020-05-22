import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutUsSettingMinePageRoutingModule } from './about-us-setting-mine-routing.module';

import { AboutUsSettingMinePage } from './about-us-setting-mine.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutUsSettingMinePageRoutingModule
  ],
  declarations: [AboutUsSettingMinePage]
})
export class AboutUsSettingMinePageModule {}
