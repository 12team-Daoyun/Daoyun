import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
import { ToastController, LoadingController } from '@ionic/angular';
import { Constants } from 'src/app/shared/constant';
import { LessonServiceService } from 'src/app/shared/services/lesson-service.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: 'app-add-lesson',
  templateUrl: './add-lesson.page.html',
  styleUrls: ['./add-lesson.page.scss'],
})
export class AddLessonPage implements OnInit {
  lessonName = '';
  teacherName = '';
  comments = '';
  grade = 0;
  constructor(private router: Router, private http: HttpClient, private toastController: ToastController,
              private lessonService: LessonServiceService) { }
  async presentToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 5000
    });
    toast.present();
  }
  ngOnInit() {
  }

  addLesson() {
    if (this.lessonName === '' || this.teacherName === '' || this.grade === 0) {
      this.presentToast('请完善班课信息');
      return;
    }
    this.lessonService.show('班课创建中');
    const userId = JSON.parse(localStorage.getItem('user')).User_ID;
    // tslint:disable-next-line:max-line-length
    const params = new HttpParams().set('userid', userId)
                                   .set('className', this.lessonName)
                                   .set('teacherName', this.teacherName)
                                   .set('grade', (this.grade).toString())
                                   .set('comments', this.comments);
    this.http.post(Constants.createClassUrl, params)
      .subscribe(async data => {
        if ((data as any).status === 1) {
          // 更新本地班课列表，并跳转至首页
          this.lessonService.updateLessons(userId);
        } else {
          this.presentToast('添加班课失败，请重试');
          return;
        }
      });
  }

}
