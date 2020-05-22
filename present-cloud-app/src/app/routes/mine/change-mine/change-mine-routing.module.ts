import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeMinePage } from './change-mine.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeMinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeMinePageRoutingModule {}
