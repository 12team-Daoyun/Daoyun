import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.page.html',
  styleUrls: ['./lessons.page.scss'],
})
export class LessonsPage implements OnInit {
  @ViewChild('lessonSlides', {static: false})
  lessonSlides: IonSlides;
  constructor(private actionSheetController: ActionSheetController, private router: Router) { }
  createLessonColor = 'rgb(62, 131, 232)';
  joinLessonColor = '';
  ngOnInit() {
  }
  async addLession() {
    const actionSheet = await this.actionSheetController.create({
      header: '选择你想进行的操作',
      mode: 'ios',
      buttons: [{
        text: '创建班课',
        handler: () => {
          console.log('Delete clicked');
          this.router.navigateByUrl('addLesson');
        }
      }, {
        text: '使用班课号加入班课',
        handler: () => {
          console.log('Share clicked');
          this.router.navigateByUrl('joinLesson');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  ionViewDidEnter() {
    this.lessonSlides.lockSwipes(true);
  }

  goDetail() {
    this.router.navigateByUrl('lesson-detail-tabs');
  }
  createLesson() {
    this.lessonSlides.lockSwipes(false);
    this.lessonSlides.slideTo(0);
    this.createLessonColor = 'rgb(62, 131, 232)';
    this.joinLessonColor = '';
    this.lessonSlides.lockSwipes(true);
  }
  joinLesson() {
    this.lessonSlides.lockSwipes(false);
    this.lessonSlides.slideTo(1);
    this.createLessonColor = '';
    this.joinLessonColor = 'rgb(62, 131, 232)';
    this.lessonSlides.lockSwipes(true);
  }

}
