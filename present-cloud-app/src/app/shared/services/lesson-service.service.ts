import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '../constant';
import { LoadingController, NavController } from '@ionic/angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class LessonServiceService {
  public loadingIsOpen: any = false;
  // tslint:disable-next-line:max-line-length
  constructor(public eventService: EventService, private nav: NavController, private http: HttpClient, private router: Router, public loadingController: LoadingController, private lessonService: LessonServiceService) { }

  updateLessons(userId) {
    // tslint:disable-next-line:prefer-const
    let that = this;
    let params = new HttpParams().set('userid', userId).set('classType', '1');
    return this.http.post(Constants.getClassUrl, params)
      .subscribe(lessons0 => {
        if ((lessons0 as any).data !== null) {
          localStorage.setItem('createLessons', JSON.stringify((lessons0 as any).data));
          params = new HttpParams().set('userid', userId).set('classType', '0');
          this.http.post(Constants.getClassUrl, params)
            .subscribe(lessons1 => {
              if ((lessons1 as any).data !== null) {
                localStorage.setItem('joinLessons', JSON.stringify((lessons1 as any).data));
                this.eventService.event.emit('updatelesson');
                that.hide();
                // 3、跳转至班课首页
                this.nav.navigateForward('tabs/lessons');
              }
            });
        }
      });
  }

  async show(text) {
    this.loadingIsOpen = true;
    return await this.loadingController.create({
      message: text,
      duration: 7000,
    }).then(a => {
      a.present().then(() => {
        if (!this.loadingIsOpen) {
          a.dismiss();
        }
      });
    });
  }

  // loading结束
  async hide() {
    if (this.loadingIsOpen === true) {
      this.loadingIsOpen = false;
      return await this.loadingController.dismiss();
    }
  }
}
