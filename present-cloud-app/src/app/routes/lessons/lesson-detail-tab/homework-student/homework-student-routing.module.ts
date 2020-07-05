import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeworkStudentPage } from './homework-student.page';

const routes: Routes = [
  {
    path: '',
    component: HomeworkStudentPage
  },
  {
    path: 'homework-detail',
    loadChildren: () => import('./homework-detail/homework-detail.module').then( m => m.HomeworkDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeworkStudentPageRoutingModule {}
