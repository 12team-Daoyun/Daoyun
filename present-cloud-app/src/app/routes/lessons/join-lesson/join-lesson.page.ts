import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { Constants } from 'src/app/shared/constant';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LessonServiceService } from 'src/app/shared/services/lesson-service.service';
import { HttpParams, HttpClient } from '@angular/common/http';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: 'app-join-lesson',
  templateUrl: './join-lesson.page.html',
  styleUrls: ['./join-lesson.page.scss'],
})
export class JoinLessonPage implements OnInit {
  lessonId: string;
  lessons = [];
  constructor(public eventService: EventService, private http: HttpClient, private toastController: ToastController, private router: Router
            , private lessonService: LessonServiceService) { }

  ngOnInit() {
    this.http.post(Constants.getAllClassesUrl, {})
      .subscribe(data => {
        if ((data as any).status === 1) {
          this.lessons = (data as any).data;
        }
      });
  }
  async presentToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 5000
    });
    toast.present();
  }
  joinLesson() {
    console.log(this.lessonId);
    if (this.lessonId === null || this.lessonId === '' || this.lessonId === undefined) {
      this.presentToast('班课id不能为空');
      return;
    }
    this.lessonService.show('正在加入班课');
    // 获取用户id
    const userId = JSON.parse(localStorage.getItem('user')).User_ID;
    const params = new HttpParams().set('classid', this.lessonId).set('userid', userId);
    // 通过lessonId加入班课
    this.http.post(Constants.joinClassUrl, params)
      .subscribe(async data => {
        if ((data as any).status === 1) {// 加入班课成功
          // 更新本地班课列表，并跳转至首页
          this.lessonService.updateLessons(userId);
        } else {// 班课不存在或加入失败
          this.lessonService.hide();
          this.presentToast('班课不存在或加入失败');
        }
    });
  }

}
