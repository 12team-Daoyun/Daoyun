import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-homework',
  templateUrl: './add-homework.page.html',
  styleUrls: ['./add-homework.page.scss'],
})
export class AddHomeworkPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }
  dismissModal() {
    if (this.modalController) {
      this.modalController.dismiss().then(() => { this.modalController = null; });
    }
  }
}
