import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, IonSlides, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HTTP } from '@ionic-native/http/ngx';
import { Constants } from 'src/app/shared/constant';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.page.html',
  styleUrls: ['./lessons.page.scss'],
})
export class LessonsPage implements OnInit {
  @ViewChild('lessonSlides', {static: false})
  lessonSlides: IonSlides;
  // tslint:disable-next-line:ban-types
  createLessons = [];
  // tslint:disable-next-line:ban-types
  joinLessons = [];
  // tslint:disable-next-line:max-line-length
  constructor(public eventService: EventService, private actionSheetController: ActionSheetController, private nav: NavController, private router: Router, private http: HTTP) {
  }
  createLessonColor = 'rgb(62, 131, 232)';
  joinLessonColor = '';
  searchValue;
  identity: number;
  ngOnInit() {
    this.createLessons = JSON.parse(localStorage.getItem('createLessons'));
    this.joinLessons = JSON.parse(localStorage.getItem('joinLessons'));
    console.log(this.createLessons);
    console.log(this.joinLessons);
    this.eventService.event.on('updatelesson', () => {
      console.log(123 + 'updatelesson');
      this.createLessons = JSON.parse(localStorage.getItem('createLessons'));
      this.joinLessons = JSON.parse(localStorage.getItem('joinLessons'));
    });
  }
  ionViewWillEnter() {
    this.identity = parseInt(JSON.parse(localStorage.getItem('user')).identity, 10);
    if (this.identity === 0) {
      this.joinLessonColor = 'rgb(62, 131, 232)';
    } else {
      this.lessonSlides.lockSwipes(false);
      this.lessonSlides.slideTo(0);
      this.createLessonColor = 'rgb(62, 131, 232)';
      this.joinLessonColor = '';
      this.lessonSlides.lockSwipes(true);
    }
  }
  async addLessonForTeacher() {
    const actionSheet = await this.actionSheetController.create({
      header: '选择你想进行的操作',
      mode: 'ios',
      buttons: [{
        text: '创建班课',
        handler: () => {
          console.log('Delete clicked');
          this.nav.navigateForward('addLesson');
        }
      }, {
        text: '使用班课号加入班课',
        handler: () => {
          console.log('Share clicked');
          this.nav.navigateForward('joinLesson');
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

  async addLessonForStudent() {
    const actionSheet = await this.actionSheetController.create({
      header: '选择你想进行的操作',
      mode: 'ios',
      buttons: [{
        text: '使用班课号加入班课',
        handler: () => {
          console.log('Share clicked');
          this.nav.navigateForward('joinLesson');
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

  // tslint:disable-next-line:variable-name
  goDetail(classId: any) {
    localStorage.setItem('classId', classId);
    const identity = JSON.parse(localStorage.getItem('user')).identity;
    if (identity === '1') {
      this.router.navigateByUrl('lesson-detail-tabs/homework');
    } else {
      this.router.navigateByUrl('lesson-detail-tabs/homework-student');
    }
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
  change() {
    const createLessons = JSON.parse(localStorage.getItem('createLessons'));
    const joinLessons = JSON.parse(localStorage.getItem('joinLessons'));
    if (this.searchValue === undefined || this.searchValue === '') {
      this.createLessons = createLessons;
      this.joinLessons = joinLessons;
      return;
    }
    for (let i = 0; i < createLessons.length;) {
      // tslint:disable-next-line:max-line-length
      if ((createLessons[i].class_name as any).search(this.searchValue) === -1 && (createLessons[i].teacher_name as any).search(this.searchValue) === -1) {
        createLessons.splice(i, 1);
      } else {
        i++;
      }
    }
    for (let i = 0; i < joinLessons.length;) {
      // tslint:disable-next-line:max-line-length
      if ((joinLessons[i].class_name as any).search(this.searchValue) === -1 && (joinLessons[i].teacher_name as any).search(this.searchValue) === -1) {
        joinLessons.splice(i, 1);
      } else {
        i++;
      }
    }
    // createLessons.forEach(lesson => {
    //   if ((lesson.class_name as any).search(this.searchValue) === -1 && (lesson.teacher_name as any).search(this.searchValue) === -1) {
    //     this.removeByValue(createLessons, lesson);
    //     console.log(lesson);
    //   }
    // });
    // joinLessons.forEach(lesson => {
    //   if ((lesson.class_name as any).search(this.searchValue) === -1 && (lesson.teacher_name as any).search(this.searchValue) === -1) {
    //     this.removeByValue(joinLessons, lesson);
    //     console.log(lesson);
    //     // (joinLessons as any).remove(lesson);
    //   }
    // });
    this.createLessons = createLessons;
    this.joinLessons = joinLessons;
  }
}
