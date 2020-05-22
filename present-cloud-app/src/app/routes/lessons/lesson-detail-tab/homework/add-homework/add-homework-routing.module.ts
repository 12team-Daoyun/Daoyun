import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddHomeworkPage } from './add-homework.page';

const routes: Routes = [
  {
    path: '',
    component: AddHomeworkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddHomeworkPageRoutingModule {}
