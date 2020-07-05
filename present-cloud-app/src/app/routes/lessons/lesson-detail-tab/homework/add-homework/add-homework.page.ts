import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LessonDetailTabPage } from '../../lesson-detail-tab.page';
import { Constants } from 'src/app/shared/constant';
import { EventService } from 'src/app/shared/services/event.service';
import { LessonServiceService } from 'src/app/shared/services/lesson-service.service';

@Component({
  selector: 'app-add-homework',
  templateUrl: './add-homework.page.html',
  styleUrls: ['./add-homework.page.scss'],
})
export class AddHomeworkPage implements OnInit {
  // tslint:disable-next-line:variable-name
  class_id;
  workName = '';
  workContent = '';
  workRequirement = '';
  // tslint:disable-next-line:max-line-length
  constructor(private lessonService: LessonServiceService, private eventService: EventService, private modalController: ModalController, private http: HttpClient, private toastController: ToastController) { }

  ngOnInit() {
    this.class_id = LessonDetailTabPage.class_id;
  }
  dismissModal() {
    if (this.modalController) {
      this.modalController.dismiss().then(() => { this.modalController = null; });
    }
  }
  validateForm() {
    if (this.workName === '' || this.workContent === '' || this.workRequirement === '') {
      return false;
    }
    return true;
  }
  async presentToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 5000
    });
    toast.present();
  }
  addHomework() {
    console.log(123);
    if (this.validateForm()) {
      this.lessonService.show('正在发布作业...');
      const params = new HttpParams().set('work_name', this.workName)
      .set('work_content', this.workContent).set('work_requirement', this.workRequirement)
      .set('class_id', this.class_id);
      this.http.post(Constants.publishHomeworkUrl, params)
        .subscribe(data => {
          if ((data as any).status === 1) {
            this.lessonService.hide();
            this.presentToast('作业已发布');
            this.eventService.event.emit('updateHomework');
            this.dismissModal();
          }
        });
    } else {
      this.presentToast('请完善表单');
    }
  }
}
