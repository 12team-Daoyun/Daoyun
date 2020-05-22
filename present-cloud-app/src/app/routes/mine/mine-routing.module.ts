import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MinePage } from './mine.page';

const routes: Routes = [
  {
    path: '',
    component: MinePage
  },  {
    path: 'change-mine',
    loadChildren: () => import('./change-mine/change-mine.module').then( m => m.ChangeMinePageModule)
  },
  {
    path: 'user-agreement-mine',
    loadChildren: () => import('./user-agreement-mine/user-agreement-mine.module').then( m => m.UserAgreementMinePageModule)
  },
  {
    path: 'about-the-software-mine',
    loadChildren: () => import('./about-the-software-mine/about-the-software-mine.module').then( m => m.AboutTheSoftwareMinePageModule)
  },
  {
    path: 'setting-mine',
    loadChildren: () => import('./setting-mine/setting-mine.module').then( m => m.SettingMinePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MinePageRoutingModule {}
