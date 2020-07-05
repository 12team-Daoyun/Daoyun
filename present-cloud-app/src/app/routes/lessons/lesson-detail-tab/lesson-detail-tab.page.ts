import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lesson-detail-tab',
  templateUrl: './lesson-detail-tab.page.html',
  styleUrls: ['./lesson-detail-tab.page.scss'],
})
export class LessonDetailTabPage implements OnInit {
  constructor() { }
  // tslint:disable-next-line:variable-name
  static class_id: number;
  static lesson: object;
  identity: number;

  ngOnInit() {
    console.log('nginit');
    this.identity = JSON.parse(localStorage.getItem('user')).identity;
    LessonDetailTabPage.class_id = parseInt(localStorage.getItem('classId'), 10);
    const joinLessons = JSON.parse(localStorage.getItem('joinLessons'));
    joinLessons.forEach((lesson: any) => {
      if (lesson.class_id === LessonDetailTabPage.class_id) {
        LessonDetailTabPage.lesson = lesson;
      }
    });
  }
  ionViewWillEnter() {
    console.log(this.identity);
  }

}
