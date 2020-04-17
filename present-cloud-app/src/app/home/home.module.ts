import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Contacts } from '@ionic-native/contacts/ngx';
import { CallLog } from '@ionic-native/call-log/ngx';
import { Device } from '@ionic-native/device/ngx';
import { HomePage } from './home.page';
import { HttpClientModule } from '@angular/common/http';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage],
  providers: [Contacts, CallLog, Device, File, FileTransfer, Camera, ImagePicker]
})
export class HomePageModule {}
