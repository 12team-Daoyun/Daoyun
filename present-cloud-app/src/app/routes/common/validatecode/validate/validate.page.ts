import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, ToastController } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { Constants } from 'src/app/shared/constant';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.page.html',
  styleUrls: ['./validate.page.scss'],
})
export class ValidatePage implements OnInit {
  @ViewChild('validateSlides', {static: false})
  validateSlides: IonSlides;
  constructor(private router: Router, private toastController: ToastController, private http: HttpClient) { }
  phoneNumber;
  countSec = 60;
  retrieveCodeHidden;
  countHidden;
  timer: any;
  validateCode = '';
  inputValidateCode;
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
    if (this.validateCode !== '' && this.inputValidateCode === this.validateCode) {
      this.router.navigate(['register'], {
        queryParams: {
            number: this.phoneNumber
        }
      });
    } else {
      this.presentToast('验证码有误，请重新输入');
      return;
    }
  }
  async presentToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
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
    this.presentToast('验证码为：' + res);
  }


  // 验证手机号格式
  validatePhone(phone: string) {
    return (/^1[3456789]\d{9}$/.test(this.phoneNumber));
  }
  getCode() {
    if (!this.validatePhone(this.phoneNumber)) {
      this.presentToast('用户名格式有误，请重新输入');
      return;
    }
    // tslint:disable-next-line:prefer-const
    let promise = this.http.post(Constants.existUserUrl, new HttpParams().set('tel',  this.phoneNumber));
    return promise.subscribe(data => {
      if ((data as any).status === 1) {
        console.log(data);
        this.presentToast('用户名已存在，请重新输入');
        return;
      }
      this.validateSlides.lockSwipeToNext(false);
      this.validateSlides.slideNext();
      this.countSec = 60;
      this.count();
      this.validateSlides.lockSwipeToNext(true);
    });
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
