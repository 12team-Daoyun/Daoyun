import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MemberStudentPageRoutingModule } from './member-student-routing.module';

import { MemberStudentPage } from './member-student.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MemberStudentPageRoutingModule
  ],
  declarations: [MemberStudentPage]
})
export class MemberStudentPageModule {}
