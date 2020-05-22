import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ScorePage } from './score/score.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homework-detail',
  templateUrl: './homework-detail.page.html',
  styleUrls: ['./homework-detail.page.scss'],
})
export class HomeworkDetailPage implements OnInit {

  constructor(private modalController: ModalController, private router: Router) { }

  ngOnInit() {
  }
  async presentModal(myComponent: any) {
    const modal = await this.modalController.create({
      component: myComponent,
      componentProps: {}
    });
    return await modal.present();
  }
  dismissModal() {
    if (this.modalController) {
      this.modalController.dismiss().then(() => { this.modalController = null; });
    }
  }

  goScore() {
    this.router.navigateByUrl('score');
  }
}
