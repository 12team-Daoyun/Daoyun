import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ScorePage } from './score/score.page';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constants } from 'src/app/shared/constant';

@Component({
  selector: 'app-homework-detail',
  templateUrl: './homework-detail.page.html',
  styleUrls: ['./homework-detail.page.scss'],
})
export class HomeworkDetailPage implements OnInit {
  // tslint:disable-next-line:variable-name
  @Input() work_id: string;
  // tslint:disable-next-line:variable-name
  @Input() class_id: string;
  homework;
  constructor(private modalController: ModalController, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    const homeworks = JSON.parse(localStorage.getItem('homeworks'));
    homeworks.forEach(h => {
      if (h.workId === this.work_id) {
        this.homework = h;
      }
    });
  }

  dismissModal() {
    if (this.modalController) {
      this.modalController.dismiss().then(() => { this.modalController = null; });
    }
  }

  goScore() {
    this.http.post(Constants.getFilesByWorkIdUrl, new HttpParams().set('workId', this.work_id))
      .subscribe(data => {
        if ((data as any).status === 1) {
          console.log(data);
          localStorage.setItem('files', JSON.stringify((data as any).data));
        } else {
          localStorage.removeItem('files');
        }
        // this.router.navigate(['score'], {
        //   queryParams: {
        //       workid: this.work_id
        //   }
        // });
        this.router.navigateByUrl('score');
      });
  }
}
