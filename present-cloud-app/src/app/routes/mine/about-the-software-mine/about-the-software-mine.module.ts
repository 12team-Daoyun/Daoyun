import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutTheSoftwareMinePageRoutingModule } from './about-the-software-mine-routing.module';

import { AboutTheSoftwareMinePage } from './about-the-software-mine.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutTheSoftwareMinePageRoutingModule
  ],
  declarations: [AboutTheSoftwareMinePage]
})
export class AboutTheSoftwareMinePageModule {}
