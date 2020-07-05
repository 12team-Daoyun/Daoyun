import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constants } from 'src/app/shared/constant';
import { LessonDetailTabPage } from '../../lesson-detail-tab.page';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  signInMembers;
  classId;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.classId = LessonDetailTabPage.class_id;
  }
  ionViewWillEnter() {
    this.http.post(Constants.getSignInMembersUrl, new HttpParams().set('classId', this.classId))
      .subscribe(data => {
        if ((data as any).status === 1) {
          this.signInMembers = (data as any).data;
        }
      });
  }

}
