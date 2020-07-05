import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LessonDetailTabPage } from './lesson-detail-tab.page';

const routes: Routes = [
  {
    path: '',
    component: LessonDetailTabPage,
    children: [
      {
        path: 'member',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./member/member.module').then(m => m.MemberPageModule)
          }
        ]
      },
      {
        path: 'homework',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./homework/homework.module').then(m => m.HomeworkPageModule)
          }
        ]
      },
      {
        path: 'detail',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./detail/detail.module').then(m => m.DetailPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: 'homework',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LessonDetailTabPageRoutingModule {}
