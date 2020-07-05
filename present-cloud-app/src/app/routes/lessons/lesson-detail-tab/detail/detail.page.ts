import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalController, NavController, AlertController, ToastController } from '@ionic/angular';
import { LessonDetailTabPage } from '../lesson-detail-tab.page';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constants } from 'src/app/shared/constant';
import { LessonServiceService } from 'src/app/shared/services/lesson-service.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  // tslint:disable-next-line:variable-name
  class_id: number;
  lesson: object;
  // tslint:disable-next-line:max-line-length
  constructor(private toastController: ToastController, private lessonService: LessonServiceService, private alertController: AlertController, private http: HttpClient, private router: Router, private modalController: ModalController, private nav: NavController) {

   }

  async presentToast(text: string) {
  const toast = await this.toastController.create({
    message: text,
    duration: 5000
  });
  toast.present();
}

  async presentAlertConfirm() {
    const that = this;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '系统消息',
      message: '确定要退出此课程吗？(若为创建者，将删除所有班课信息)',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            return;
          }
        }, {
          text: '确定',
          handler: () => {
            that.lessonService.show('正在退出...');
            const userid = JSON.parse(localStorage.getItem('user')).User_ID;
            const params = new HttpParams().set('user_id', userid).set('class_id', this.class_id.toString());
            this.http.post(Constants.quitClassUrl, params)
              .subscribe(data => {
                if ((data as any).status === 1) {
                  that.lessonService.updateLessons(userid);
                  that.presentToast('您已退出此班课');
                } else {
                  that.presentToast('退出班课失败，请重新操作');
                }
              });
          }
        }
      ]
    });
    await alert.present();
  }

  ngOnInit() {
    this.class_id = LessonDetailTabPage.class_id;
    this.lesson = LessonDetailTabPage.lesson;
  }
  goBack() {
    this.nav.navigateBack('tabs/lessons');
  }

  exit() {
    this.presentAlertConfirm();
  }

}
