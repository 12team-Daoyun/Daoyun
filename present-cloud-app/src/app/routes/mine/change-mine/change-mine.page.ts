import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
import { LessonServiceService } from 'src/app/shared/services/lesson-service.service';
import { Constants } from 'src/app/shared/constant';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-change-mine',
  templateUrl: './change-mine.page.html',
  styleUrls: ['./change-mine.page.scss'],
})
export class ChangeMinePage implements OnInit {
  user: object;
  constructor(private nav: NavController, private http: HTTP, private lessonService: LessonServiceService
              // tslint:disable-next-line:align
              , public alertController: AlertController) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
  async presentAlert(text) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '系统提示',
      message: text,
      buttons: ['OK']
    });

    await alert.present();
  }

  // finish() {
  //   if (this.identity === this.user.identity && this.sex === this.user.sex && this.identity !== '') {
  //     this.router.navigateByUrl('tabs/mine');
  //     return;
  //   }
  //   if (this.identity === '') {
  //     this.presentAlert('请完善信息');
  //     return;
  //   }
  //   // 更新用户信息
  //   this.user.sex = this.sex;
  //   this.user.identity = this.identity;
  //   this.lessonService.createLoading('正在更新用户信息');
  //   this.http.post(Constants.updateUserInfoUrl, {user: JSON.stringify(this.user)}, {})
  //     .then(data => {
  //       if (data.status === 1) {
  //         this.lessonService.onDismiss();
  //         this.router.navigateByUrl('tabs/mine');
  //       } else {
  //         this.presentAlert('信息更新失败，请重新尝试');
  //       }
  //     });
  // }
  // updateSex(sex) {
  //   this.sex = sex;
  // }
  // updateIdentity(identity) {
  //   this.identity = identity;
  // }

  goBack() {
    this.nav.navigateBack('tabs/mine');
  }
}
