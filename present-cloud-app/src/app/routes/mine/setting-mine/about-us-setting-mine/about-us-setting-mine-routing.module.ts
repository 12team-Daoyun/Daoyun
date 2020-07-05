import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutUsSettingMinePage } from './about-us-setting-mine.page';

const routes: Routes = [
  {
    path: '',
    component: AboutUsSettingMinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutUsSettingMinePageRoutingModule {}
