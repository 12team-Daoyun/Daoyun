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
        path: 'member-student',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./member-student/member-student.module').then(m => m.MemberStudentPageModule)
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
        path: 'homework-student',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./homework-student/homework-student.module').then(m => m.HomeworkStudentPageModule)
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
  },
  {
    path: 'homework-student',
    loadChildren: () => import('./homework-student/homework-student.module').then( m => m.HomeworkStudentPageModule)
  },
  {
    path: 'member-student',
    loadChildren: () => import('./member-student/member-student.module').then( m => m.MemberStudentPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LessonDetailTabPageRoutingModule {}
