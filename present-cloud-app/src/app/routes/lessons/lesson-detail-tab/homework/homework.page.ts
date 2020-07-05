import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { AddHomeworkPage } from './add-homework/add-homework.page';
import { HomeworkDetailPage } from './homework-detail/homework-detail.page';
import { LessonDetailTabPage } from '../lesson-detail-tab.page';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constants } from 'src/app/shared/constant';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: 'app-homework',
  templateUrl: './homework.page.html',
  styleUrls: ['./homework.page.scss'],
})
export class HomeworkPage implements OnInit {
  // tslint:disable-next-line:align
  // tslint:disable-next-line:variable-name
  class_id: any;
  lesson: object;
  homeworks: Array<object>;
  // tslint:disable-next-line:max-line-length
  constructor(private eventService: EventService, private http: HttpClient, private router: Router, private modalController: ModalController, private nav: NavController) {
   }

   ngOnInit() {
    this.class_id = LessonDetailTabPage.class_id;
    this.lesson = LessonDetailTabPage.lesson;
    this.eventService.event.on('updateHomework', () => {
      this.getHomeworks(this.class_id);
      return;
    });
    this.getHomeworks(this.class_id);
  }
  getHomeworks(classId: any) {
    this.http.post(Constants.getHomeworkListByClassIdUrl, new HttpParams().set('class_id', classId))
      .subscribe(data => {
        if ((data as any).status === 1) {
          this.homeworks = (data as any).data;
          localStorage.setItem('homeworks', JSON.stringify(this.homeworks));
          console.log(this.homeworks);
        }
      });
  }
  async presentModal(myComponent: any, workid: any) {
    const modal = await this.modalController.create({
      component: myComponent,
      componentProps: {work_id: workid, class_id: this.class_id}
    });
    return await modal.present();
  }
  addHomework() {
      this.presentModal(AddHomeworkPage, '');
  }
  showDetail(workid) {
      console.log(workid);
      this.presentModal(HomeworkDetailPage, workid);
  }
  goBack() {
    this.nav.navigateBack('tabs/lessons');
  }
}
