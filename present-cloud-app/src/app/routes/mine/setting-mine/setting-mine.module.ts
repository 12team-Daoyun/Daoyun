import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingMinePageRoutingModule } from './setting-mine-routing.module';

import { SettingMinePage } from './setting-mine.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingMinePageRoutingModule
  ],
  declarations: [SettingMinePage]
})
export class SettingMinePageModule {}
