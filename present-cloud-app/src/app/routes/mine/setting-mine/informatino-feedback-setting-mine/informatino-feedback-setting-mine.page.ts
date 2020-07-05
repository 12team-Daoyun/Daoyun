import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informatino-feedback-setting-mine',
  templateUrl: './informatino-feedback-setting-mine.page.html',
  styleUrls: ['./informatino-feedback-setting-mine.page.scss'],
})
export class InformatinoFeedbackSettingMinePage implements OnInit {

  information = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goBack(){
    this.router.navigateByUrl('setting-mine');
  }

  onChangeText(value:string){
    this.information=value
  }

  submit() {
    this.router.navigate(['setting-mine'], {
      queryParams: {
          inf: this.information
      }
  });
  }

}
