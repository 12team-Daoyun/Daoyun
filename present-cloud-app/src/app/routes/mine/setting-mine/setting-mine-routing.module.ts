import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingMinePage } from './setting-mine.page';

const routes: Routes = [
  {
    path: '',
    component: SettingMinePage
  },
  {
    path: 'about-us-setting-mine',
    loadChildren: () => import('./about-us-setting-mine/about-us-setting-mine.module').then( m => m.AboutUsSettingMinePageModule)
  },
  {
    path: 'informatino-feedback-setting-mine',
    loadChildren: () => import('./informatino-feedback-setting-mine/informatino-feedback-setting-mine.module').then( m => m.InformatinoFeedbackSettingMinePageModule)
  },
  {
    path: 'version-setting-mine',
    loadChildren: () => import('./version-setting-mine/version-setting-mine.module').then( m => m.VersionSettingMinePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingMinePageRoutingModule {}
