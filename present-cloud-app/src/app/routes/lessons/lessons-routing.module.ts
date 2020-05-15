import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LessonsPage } from './lessons.page';

const routes: Routes = [
  {
    path: '',
    component: LessonsPage
  },
  {
    path: 'add-lesson',
    loadChildren: () => import('./add-lesson/add-lesson.module').then( m => m.AddLessonPageModule)
  },
  {
    path: 'join-lesson',
    loadChildren: () => import('./join-lesson/join-lesson.module').then( m => m.JoinLessonPageModule)
  },
  {
    path: 'lesson-list',
    loadChildren: () => import('./lesson-list/lesson-list.module').then( m => m.LessonListPageModule)
  },
  {
    path: 'homework',
    loadChildren: () => import('./homework/homework.module').then( m => m.HomeworkPageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LessonsPageRoutingModule {}
