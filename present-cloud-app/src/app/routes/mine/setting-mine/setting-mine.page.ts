import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting-mine',
  templateUrl: './setting-mine.page.html',
  styleUrls: ['./setting-mine.page.scss'],
})
export class SettingMinePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goBack(){
    this.router.navigateByUrl('tabs/mine');
  }

  to_aboutUs(){
    this.router.navigateByUrl('about-us-setting-mine');
  }

  to_feedback(){
    this.router.navigateByUrl('informatino-feedback-setting-mine');
  }

  to_version(){
    this.router.navigateByUrl('version-setting-mine');
  }

  exit() {
    this.router.navigateByUrl('login');
  }
}
