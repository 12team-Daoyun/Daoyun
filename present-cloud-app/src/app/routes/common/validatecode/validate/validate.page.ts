import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.page.html',
  styleUrls: ['./validate.page.scss'],
})
export class ValidatePage implements OnInit {
  @ViewChild('validateSlides', {static: false})
  validateSlides: IonSlides;
  constructor(private router: Router, private toastController: ToastController) { }
  phoneNumber;
  countSec = 60;
  retrieveCodeHidden;
  countHidden;
  timer: any;
  validateCode;
  ngOnInit() {
  }
  count() {
    let sendTime = Math.random() * 5;
    sendTime = parseInt(sendTime.toString(), 10) + 1;
    this.retrieveCodeHidden = true;
    this.countHidden = false;
    const that = this;
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
  retrieveCode() {
    this.countSec = 60;
    this.count();
  }
  ionViewDidEnter() {
    this.validateSlides.lockSwipes(true);
  }
  nextStep() {
    this.router.navigateByUrl('register');
  }
  async presentToast(code: string) {
    const toast = await this.toastController.create({
      message: '验证码为：' + code,
      duration: 5000
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
  getCode() {
    this.validateSlides.lockSwipeToNext(false);
    this.validateSlides.slideNext();
    this.countSec = 60;
    this.count();
    this.validateSlides.lockSwipeToNext(true);
  }
  preStep() {
    this.validateSlides.lockSwipeToPrev(false);
    clearInterval(this.timer);
    this.validateSlides.slidePrev();
    this.validateSlides.lockSwipeToPrev(true);
  }
  goLogin() {
    this.router.navigateByUrl('login');
  }
}
