import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupDetailPage } from './signup-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SignupDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupDetailPageRoutingModule {}
