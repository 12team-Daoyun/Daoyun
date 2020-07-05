import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { AlertController, NavController } from '@ionic/angular';
import { Constants } from 'src/app/shared/constant';
import { HttpParams, HttpClient } from '@angular/common/http';
import { LessonDetailTabPage } from '../lesson-detail-tab.page';
import {Geolocation} from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-member-student',
  templateUrl: './member-student.page.html',
  styleUrls: ['./member-student.page.scss'],
})
export class MemberStudentPage implements OnInit {
  // tslint:disable-next-line:max-line-length
  constructor(private geolocation: Geolocation, private http: HttpClient, public alertController: AlertController, private nav: NavController) { }
  // tslint:disable-next-line:variable-name
  class_id: any;
  signInText = '参与签到';
  isSignIn;
  timeInterval: any;
  count = 60;
  members = [
    {User_Name: '杨立坚', sex: '男'}, {User_Name: 'ylj', sex: '男'}
  ];
  lesson: object;
  user: object;
  latitude;
  longitude;
  async presentAlert(text1, text2) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '系统消息',
      subHeader: text1,
      message: text2,
      buttons: ['OK']
    });

    await alert.present();
  }
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
    this.class_id = LessonDetailTabPage.class_id;
    this.lesson = LessonDetailTabPage.lesson;
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getMembers(this.class_id);
  }
  getMembers(classid) {
    const params = new HttpParams().set('class_id', classid);
    this.http.post(Constants.getClassMemberUrl, params)
      .subscribe(data => {
        if ((data as any).status === 1) {
          this.members = (data as any).data;
          console.log(this.members);
        } else {
          this.presentAlert('班课成员列表获取失败', '');
        }
      });
  }
  ionViewWillEnter() {
    this.isSignIn = localStorage.getItem('isSignIn');
    console.log(this.isSignIn);
    if (this.isSignIn === null) {
      this.signInText = '参与签到';
    } else {
      this.signInText = '已签到';
    }
  }
  signup() {
    this.isSignIn = localStorage.getItem('isSignIn');
    if (this.isSignIn === 'true') {
      this.presentAlert('您已参与签到，请勿重复签到', '');
      return;
    }
    // tslint:disable-next-line:variable-name
    const user_id = JSON.parse(localStorage.getItem('user')).User_ID;
    const params = new HttpParams().set('user_id', user_id).set('class_id', this.class_id)
      .set('latitude', this.latitude).set('longitude', this.longitude);
    this.http.post(Constants.recordSignInUrl, params)
      .subscribe(data => {
        if ((data as any).status === 1) {
          this.presentAlert('签到成功', '');
          localStorage.setItem('isSignIn', 'true');
          this.signInText = '已签到';
          this.countSec();
        } else if ((data as any).status === 0) {
          this.presentAlert('签到失败，教师未发布签到', '');
        } else {
          this.presentAlert('签到失败，超出签到距离', '(需与老师距离在50米以内)');
        }
      });
  }
  countSec() {
    const that = this;
    this.timeInterval = setInterval(() => {
      console.log(that.count);
      if ( that.count > 0) {
        that.count = that.count - 1;
      } else {
        localStorage.removeItem('isSignIn');
        that.signInText = '参与签到';
        that.count = 60;
        clearInterval(that.timeInterval);
      }
    }, 1000);
  }
  goBack() {
    this.nav.navigateBack('tabs/lessons');
  }
}
