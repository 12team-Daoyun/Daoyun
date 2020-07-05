import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
import { Constants } from 'src/app/shared/constant';
import { AlertController, NavController } from '@ionic/angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LessonDetailTabPage } from '../lesson-detail-tab.page';
import {Geolocation} from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'app-member',
  templateUrl: './member.page.html',
  styleUrls: ['./member.page.scss'],
})
export class MemberPage implements OnInit {
  // tslint:disable-next-line:variable-name
  class_id: any;
  signInStatus: any;
  count = 60;
  timeInterval: any;
  signInText = '发起签到';
  user: object;
  members = [
    {User_Name: '杨立坚', sex: '男'}, {User_Name: 'ylj', sex: '男'}
  ];
  lesson: object;
  latitude;
  longitude;
  // tslint:disable-next-line:max-line-length
  constructor(private geolocation: Geolocation, private router: Router, private http: HttpClient, public alertController: AlertController, private nav: NavController) { }

  ngOnInit() {
    // 获取地理位置
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp);
      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude);
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    // console.log('dist:' + this.getDistance(26.101708, 119.148062, 26.101708, 119.148063));
    this.class_id = LessonDetailTabPage.class_id;
    this.lesson = LessonDetailTabPage.lesson;
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getMembers(this.class_id);
  }

  // getDistance(lat1, lng1, lat2, lng2) {
  //   let radLat1 = lat1 * Math.PI / 180.0;
  //   let radLat2 = lat2 * Math.PI / 180.0;
  //   let a = radLat1 - radLat2;
  //   let b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
  //   let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
  //   Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  //   s = s * 6378.137 ; // EARTH_RADIUS;
  //   s = Math.round(s * 10000) / 10000;
  //   return s;
  // }

  getMembers(classid) {
    const params = new HttpParams().set('class_id', classid);
    this.http.post(Constants.getClassMemberUrl, params)
      .subscribe(data => {
        if ((data as any).status === 1) {
          this.members = (data as any).data;
        } else {
          this.presentAlert('班课成员列表获取失败');
        }
      });
  }
  ionViewWillEnter() {
    this.signInStatus = localStorage.getItem('signInStatus');
    if (this.signInStatus === '1') {
      this.signInText = '签到中';
    } else {
      this.signInText = '发起签到';
    }
  }
  async presentAlert(text) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '系统消息',
      message: text,
      buttons: ['OK']
    });

    await alert.present();
  }

  signup() {
    this.signInStatus = localStorage.getItem('signInStatus');
    if (this.signInStatus === '1') {
      this.presentAlert('签到已经发起，请勿重复操作');
      return;
    }

    // 更新签到状态
    const params = new HttpParams().set('class_id', this.class_id)
      .set('latitude', this.latitude).set('longitude', this.longitude);
    this.http.post(Constants.beginSignInUrl, params)
      .subscribe(data => {
        if ((data as any).status === 1) {
          this.presentAlert('课程签到已发起，请通知学生一分钟内进入班课签到');
          localStorage.setItem('signInStatus', '1');
          this.signInText = '签到中(剩余时间：' + this.count + 's)';
          // 一分钟后自动关闭签到
          this.countSecToAutoCloseSignup();
          return;
        }
      });
    // this.router.navigateByUrl('signup');
  }
  // 一分钟后自动关闭签到
  countSecToAutoCloseSignup() {
    const that = this;
    this.timeInterval = setInterval(() => {
      if (this.count > 0) {
        that.count = this.count - 1;
        that.signInText = '签到中(剩余时间：' + that.count + 's)';
      } else {
        const params = new HttpParams().set('class_id', this.class_id);
        this.http.post(Constants.cancelSignInUrl, params)
          .subscribe(data => {
            if ((data as any).status === 1) {
              that.count = 60;
              localStorage.removeItem('signInStatus');
              this.signInText = '发起签到';
              clearInterval(that.timeInterval);
            }
          });
      }
    }, 1000);
  }
  signInDetail() {
    this.router.navigateByUrl('signupDetail');
  }
  goBack() {
    this.nav.navigateBack('tabs/lessons');
  }
}
