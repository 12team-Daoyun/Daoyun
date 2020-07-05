import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constants } from 'src/app/shared/constant';
@Component({
  selector: 'app-homework-detail',
  templateUrl: './homework-detail.page.html',
  styleUrls: ['./homework-detail.page.scss'],
})
export class HomeworkDetailPage implements OnInit {
  file: any;
  // tslint:disable-next-line:variable-name
  @Input() work_id: string;
  // tslint:disable-next-line:variable-name
  @Input() class_id: string;
  @Input() isUpload: boolean;
  homework;
  // tslint:disable-next-line:max-line-length
  constructor(private http: HttpClient, private toastController: ToastController, private modalController: ModalController, private router: Router) { }

  ngOnInit() {
    const homeworks = JSON.parse(localStorage.getItem('homeworks'));
    homeworks.forEach(h => {
      if (h.workId === this.work_id) {
        this.homework = h;
      }
    });
    console.log(this.isUpload);
  }
  dismissModal() {
    if (this.modalController) {
      this.modalController.dismiss().then(() => { this.modalController = null; });
    }
  }
  upadateHomework() {
    const file = (event.target as any).files[0];
    console.log(file);
    this.file = file;
  }
  doUpload() {
    // tslint:disable-next-line:variable-name
    const user_id = JSON.parse(localStorage.getItem('user')).User_ID;
    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('work_id', this.work_id);
    formData.append('class_id', this.class_id);
    formData.append('user_id', user_id);
    this.http.post(Constants.uploadHomeworkUrl, formData)
      .subscribe(data => {
          if ((data as any).status === 1) {
            this.presentToast('文件上传成功');
            this.dismissModal();
          } else {
            this.presentToast('文件上传失败，请重试');
            return;
          }
      });
  }
  async presentToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 5000
    });
    toast.present();
  }

}
