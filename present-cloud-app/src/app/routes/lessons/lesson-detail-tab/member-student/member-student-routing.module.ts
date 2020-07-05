import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemberStudentPage } from './member-student.page';

const routes: Routes = [
  {
    path: '',
    component: MemberStudentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemberStudentPageRoutingModule {}
