import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, NavController, ToastController, LoadingController } from '@ionic/angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constants } from 'src/app/shared/constant';
// import VConsole from 'vconsole';
import { LessonServiceService } from 'src/app/shared/services/lesson-service.service';
// tslint:disable-next-line:prefer-const

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('loginSlides', {static: false})
  loginSlides: IonSlides;
  user = {
    name: '',
    pwd: '',
    phone: ''
  };
  isPass = '';
  stuInf: any;
  validateClass = 'myclass2';
  pwdClass = 'myclass1';
  constructor(private router: Router, private navCtrl: NavController, private toastController: ToastController, private http: HttpClient,
              public loadingController: LoadingController, private lessonService: LessonServiceService) {
                const user = localStorage.getItem('user');
                console.log(user);
                if (user !== undefined && user !== null) {
                  this.navCtrl.navigateForward('tabs/lessons');
                }
               }

  ngOnInit() {

  }
  ionViewDidEnter() {
    this.loginSlides.lockSwipes(true);
  }

  async presentToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 5000
    });
    toast.present();
  }
  validatePwFormat(pwd: string) {
    return (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(pwd));
  }
  async login() {
    if (!this.validatePhone(this.user.name) || !this.validatePwFormat(this.user.pwd)) {
      this.presentToast('用户名或密码有误，请重新输入');
      return false;
    }
    this.lessonService.show('登录中');
    // 调用登录接口③
    console.log(this.user);
    const params = new HttpParams().set('tel', this.user.name).set('pwd', this.user.pwd);
    this.http.post(Constants.loginUrl, params)
    .subscribe(data => {
        console.log(data);
        if ((data as any).status === 0) {// 验证不通过
          this.presentToast('用户名不存在或密码错误');
          this.lessonService.hide();
          return false;
        } else {// 登录成功
          // 存储以下信息至本地存储
          // 1、用户对象信息 data
          console.log(data);
          const user = (data as any).data;
          console.log(user);
          localStorage.setItem('user', JSON.stringify(user));
          const userId = user.User_ID;
          // 2、获取班课信息，并存入本地存储
          this.lessonService.updateLessons(userId);
        }
    });
  }

  // 判断数据库是否存在该用户①
  nextStep() {
    console.log(this.user.phone);
    if (!this.validatePhone(this.user.phone)) {
      this.presentToast('手机号码格式有误，请重新输入');
      return false;
    }
    const params = new HttpParams().set('tel', this.user.phone);
    this.http.post(Constants.existUserUrl, params)
    .subscribe(data => {
      if ((data as any).status === 1) {
        this.router.navigate(['validateLogin'], {
          queryParams: {
              number: this.user.phone
          }
        });
      } else {
        this.presentToast('该手机号码未被注册，请前往注册');
        return false;
      }
    });
  }
  // 验证手机号格式
  validatePhone(phone: string) {
    return (/^1[3456789]\d{9}$/.test(phone));
  }

  register() {
    this.router.navigateByUrl('validate');
  }

  validateTab() {
    this.validateClass = 'myclass2 ios hydrated';
    this.pwdClass = 'myclass1 ios hydrated';
    this.loginSlides.lockSwipes(false);
    this.loginSlides.slideTo(0);
    this.loginSlides.lockSwipes(true);
  }
  pwdTab() {
    this.validateClass = 'myclass1 ios hydrated';
    this.pwdClass = 'myclass2 ios hydrated';
    this.loginSlides.lockSwipes(false);
    this.loginSlides.slideTo(1);
    this.loginSlides.lockSwipes(true);
  }
}
