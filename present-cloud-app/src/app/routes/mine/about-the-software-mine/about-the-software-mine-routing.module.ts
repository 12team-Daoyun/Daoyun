import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutTheSoftwareMinePage } from './about-the-software-mine.page';

const routes: Routes = [
  {
    path: '',
    component: AboutTheSoftwareMinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutTheSoftwareMinePageRoutingModule {}
