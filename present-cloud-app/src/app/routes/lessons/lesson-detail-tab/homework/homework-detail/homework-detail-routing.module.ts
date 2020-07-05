import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeworkDetailPage } from './homework-detail.page';

const routes: Routes = [
  {
    path: '',
    component: HomeworkDetailPage
  },
  {
    path: 'score',
    loadChildren: () => import('./score/score.module').then( m => m.ScorePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeworkDetailPageRoutingModule {}
