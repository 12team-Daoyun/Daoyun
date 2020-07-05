import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CurriculumCirclePageRoutingModule } from './curriculum-circle-routing.module';

import { CurriculumCirclePage } from './curriculum-circle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CurriculumCirclePageRoutingModule
  ],
  declarations: [CurriculumCirclePage]
})
export class CurriculumCirclePageModule {}
