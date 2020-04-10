import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.page.html',
  styleUrls: ['./lessons.page.scss'],
})
export class LessonsPage implements OnInit {

  constructor(private actionSheetController: ActionSheetController, private router: Router) { }

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

}
