import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupDetailPageRoutingModule } from './signup-detail-routing.module';

import { SignupDetailPage } from './signup-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupDetailPageRoutingModule
  ],
  declarations: [SignupDetailPage]
})
export class SignupDetailPageModule {}
