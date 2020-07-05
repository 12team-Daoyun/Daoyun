import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeworkDetailPage } from './homework-detail.page';

const routes: Routes = [
  {
    path: '',
    component: HomeworkDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeworkDetailPageRoutingModule {}
