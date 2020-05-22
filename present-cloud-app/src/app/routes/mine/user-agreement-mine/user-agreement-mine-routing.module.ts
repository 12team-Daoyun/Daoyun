import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserAgreementMinePage } from './user-agreement-mine.page';

const routes: Routes = [
  {
    path: '',
    component: UserAgreementMinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserAgreementMinePageRoutingModule {}
