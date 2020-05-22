import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VersionSettingMinePageRoutingModule } from './version-setting-mine-routing.module';

import { VersionSettingMinePage } from './version-setting-mine.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VersionSettingMinePageRoutingModule
  ],
  declarations: [VersionSettingMinePage]
})
export class VersionSettingMinePageModule {}
