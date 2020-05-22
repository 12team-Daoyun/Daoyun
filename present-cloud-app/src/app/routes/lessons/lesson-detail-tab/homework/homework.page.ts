import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddHomeworkPage } from './add-homework/add-homework.page';
import { HomeworkDetailPage } from './homework-detail/homework-detail.page';

@Component({
  selector: 'app-homework',
  templateUrl: './homework.page.html',
  styleUrls: ['./homework.page.scss'],
})
export class HomeworkPage implements OnInit {
  // tslint:disable-next-line:align

  constructor(private router: Router, private modalController: ModalController) { }

  ngOnInit() {
  }
  async presentModal(myComponent: any) {
    const modal = await this.modalController.create({
      component: myComponent,
      componentProps: {}
    });
    return await modal.present();
  }
  addHomework() {
      this.presentModal(AddHomeworkPage);
  }
  showDetail() {
      this.presentModal(HomeworkDetailPage);
  }
}
