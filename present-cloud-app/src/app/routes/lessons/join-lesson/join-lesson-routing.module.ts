import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JoinLessonPage } from './join-lesson.page';

const routes: Routes = [
  {
    path: '',
    component: JoinLessonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JoinLessonPageRoutingModule {}
