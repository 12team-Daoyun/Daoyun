import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserAgreementMinePageRoutingModule } from './user-agreement-mine-routing.module';

import { UserAgreementMinePage } from './user-agreement-mine.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserAgreementMinePageRoutingModule
  ],
  declarations: [UserAgreementMinePage]
})
export class UserAgreementMinePageModule {}
