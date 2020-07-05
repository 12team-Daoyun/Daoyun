import { Component, OnInit } from '@angular/core';
import { HomeworkDetailPage } from './homework-detail/homework-detail.page';
import { ModalController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LessonDetailTabPage } from '../lesson-detail-tab.page';
import { Constants } from 'src/app/shared/constant';
import { HttpParams, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-homework-student',
  templateUrl: './homework-student.page.html',
  styleUrls: ['./homework-student.page.scss'],
})
export class HomeworkStudentPage implements OnInit {

  // tslint:disable-next-line:variable-name
  class_id: any;
  lesson: object;
  homeworks: Array<object>;
  constructor(private http: HttpClient, private router: Router, private modalController: ModalController, private nav: NavController) {
   }

   ngOnInit() {
    this.class_id = LessonDetailTabPage.class_id;
    this.lesson = LessonDetailTabPage.lesson;
    this.getHomeworks(this.class_id);
  }
  getHomeworks(classId: any) {
    this.http.post(Constants.getHomeworkListByClassIdUrl, new HttpParams().set('class_id', classId))
      .subscribe(data => {
        if ((data as any).status === 1) {
          this.homeworks = (data as any).data;
          localStorage.setItem('homeworks', JSON.stringify(this.homeworks));
        }
      });
  }
  async presentModal(myComponent: any, workid, isupload) {
    const modal = await this.modalController.create({
      component: myComponent,
      componentProps: {work_id: workid, class_id: this.class_id, isUpload: isupload}
    });
    return await modal.present();
  }
  showDetail(workid) {
    let isUpload = false;
    const userId = JSON.parse(localStorage.getItem('user')).User_ID;
    const params = new HttpParams().set('classId', this.class_id).set('userId', userId).set('workId', workid);
    this.http.post(Constants.checkUploadFileUrl, params)
      .subscribe(data => {
        if ((data as any).status === 1) {
          isUpload = true;
        } else {
          isUpload = false;
        }
        this.presentModal(HomeworkDetailPage, workid, isUpload);
      });
  }
  goBack() {
    this.nav.navigateBack('tabs/lessons');
  }

}
