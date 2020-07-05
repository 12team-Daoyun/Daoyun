import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, NavController } from '@ionic/angular';

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
    pwd: ''
  };
  isPass = '';
  stuInf: any;
  validateClass = 'myclass2';
  pwdClass = 'myclass1';
  constructor(private router: Router, private navCtrl: NavController) { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.loginSlides.lockSwipes(true);
  }

  login() {
    this.router.navigateByUrl('tabs/lessons');
  }
  nextStep() {
    this.router.navigate(['validateLogin'], {
      queryParams: {
          number: this.user.name
      }
  });
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
