import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VersionSettingMinePage } from './version-setting-mine.page';

const routes: Routes = [
  {
    path: '',
    component: VersionSettingMinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VersionSettingMinePageRoutingModule {}
