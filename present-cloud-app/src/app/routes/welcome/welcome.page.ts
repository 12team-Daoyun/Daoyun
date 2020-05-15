import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Router } from '@angular/router';
const APP_KEY = 'App';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class WelcomePage implements OnInit {
  hideSkip = false;
  mytransition = '2s';
  myopacity = 0;
  myclass = 'myclass1';
  // 找到页面中的slides元素
  @ViewChild(IonSlides, {static: false})
  slides: IonSlides;

  constructor(private router: Router, private localStorageService: LocalStorageService) {
   }

  ngOnInit() {
    console.log(this.slides);
  }

  ionViewWillEnter() {
    const appCfg: any = this.localStorageService.get(APP_KEY, {
      hasRun: 0,
      version: '1.0'
    });
    if (appCfg.hasRun === 0) {
      console.log(0);
      appCfg.hasRun = 1;
      this.localStorageService.set(APP_KEY, appCfg);
      return true;
    } else {
      console.log(1);
      this.router.navigateByUrl('home');
    }
  }

  slidesWillChange() {
    // console.log(event.target.isEnd());
    // event.target.isEnd().then((isEnd)=>{
    // this.hideSkip = isEnd;
    // })
    // 监听slides元素的isEnd事件，并通过异步调用的方式来为hideSkip赋值
    this.slides.isEnd().then((end) => {
      this.hideSkip = end;
      if (end) {
        this.myclass = 'myclass2';
        // this.mytransition = "2s";
        // this.myopacity=1;
      } else {
        this.myclass = 'myclass1';
        // this.mytransition="0.5s"
        // this.myopacity=0;
      }
    });
  }

  onSkip() {
    this.router.navigateByUrl('signup');
  }
  onClick() {
    this.router.navigateByUrl('login');
  }
}
