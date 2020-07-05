import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastController, NavController } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { Constants } from 'src/app/shared/constant';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user = {
    User_Name: '',
    school: '',
    college: '',
    sex: '',
    identity: '',
    pwd: '',
    repeatPwd: '',
    User_ID: ''
  };
  // tslint:disable-next-line:max-line-length
  constructor(private navCtrl: NavController, private toastController: ToastController, private http: HttpClient, private activeRoute: ActivatedRoute) {
    this.activeRoute.queryParams.subscribe((params: Params) => {
      this.user.User_ID = params.number;
  });
   }

  ngOnInit() {
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

  finishSignUp() {
    if (! this.completeForm()) {
      this.presentToast('请完善表单');
      return;
    }
    if (!this.validatePwFormat(this.user.pwd)) {
      this.presentToast('密码至少8-16个字符，至少1个大写字母，1个小写字母和1个数字，其他可以是任意字符');
      return;
    }
    if (this.user.pwd !== this.user.repeatPwd) {
      this.presentToast('两次密码不一致');
      return;
    }
    const params = new HttpParams().set('tel', this.user.User_ID)
      .set('pwd', this.user.pwd).set('username', this.user.User_Name)
      .set('school', this.user.school).set('college', this.user.college)
      .set('sex', this.user.sex).set('identity', this.user.identity);
    // tslint:disable-next-line:max-line-length
    this.http.post(Constants.registerUrl, params)
      .subscribe(data => {
        if ((data as any).status === 1) {
            localStorage.setItem('user', JSON.stringify(this.user));
            this.navCtrl.navigateForward('tabs/lessons');
        } else {
          this.presentToast('注册失败，请重试');
          return;
        }
      });
  }
  completeForm() {
    // tslint:disable-next-line:max-line-length
    if (this.user.school === '' || this.user.college === '' || this.user.sex === '' || this.user.User_Name === null || this.user.identity === '') {
      return false;
    }
    return true;
  }

}
