import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-validate-login',
  templateUrl: './validate-login.page.html',
  styleUrls: ['./validate-login.page.scss'],
})
export class ValidateLoginPage implements OnInit {
  phoneNumber: string;
  countSec = 60;
  retrieveCodeHidden = true;
  countHidden = false;
  validateCode;
  inputValidateCode;
  showError = true;
  constructor(private router: Router, private navCtrl: NavController, private activeRoute: ActivatedRoute,
              private toastController: ToastController) {
    this.activeRoute.queryParams.subscribe((params: Params) => {
            this.phoneNumber = params.number;
        });
   }
   timer: any;
  ngOnInit() {
    this.count();
  }
  count() {
    let sendTime = Math.random() * 5;
    sendTime = parseInt(sendTime.toString(), 10) + 1;
    const that = this;
    this.retrieveCodeHidden = true;
    this.countHidden = false;
    // tslint:disable-next-line:only-arrow-functions
    this.timer = setInterval(function() {
      if (that.countSec > 1) {
        that.countSec = that.countSec - 1;
        if (that.countSec === 60 - sendTime) {
          that.getValidateCode();
        }
      } else {
        clearInterval(that.timer);
        that.countHidden = true;
        that.retrieveCodeHidden = false;
      }
    }, 1000);
  }
  async presentToast(code: string) {
    const toast = await this.toastController.create({
      message: '验证码为：' + code,
      duration: 5000
    });
    toast.present();
  }
  async presentErrorToast(error: string) {
    const toast = await this.toastController.create({
      message: error,
      duration: 3000
    });
    toast.present();
  }

  getValidateCode() {
    // 0-9的随机数
    // tslint:disable-next-line:prefer-const
    let res = ''; // 容器
    for (let i = 0; i < 6; i++) {// 循环六次
      let num = Math.random() * 10; // Math.random();每次生成(0-1)之间的数;
      num = parseInt(num.toString(), 10);
      res = res + num;
    }
    this.validateCode = res;
    this.presentToast(res);
  }
  login() {
    if (this.inputValidateCode === this.validateCode) {
      this.navCtrl.navigateForward('tabs/lessons');
    } else {
      this.presentErrorToast('验证码有误，请重新输入');
      return;
    }
  }
  preStep() {
    // this.router.navigateByUrl('login');
    this.navCtrl.navigateBack('login');
  }
  retrieveCode() {
    this.countSec = 60;
    this.count();
  }
}
