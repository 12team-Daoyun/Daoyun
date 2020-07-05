import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurriculumCirclePage } from './curriculum-circle.page';

const routes: Routes = [
  {
    path: '',
    component: CurriculumCirclePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurriculumCirclePageRoutingModule {}
