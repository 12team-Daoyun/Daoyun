import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddLessonPage } from './add-lesson.page';

const routes: Routes = [
  {
    path: '',
    component: AddLessonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddLessonPageRoutingModule {}
