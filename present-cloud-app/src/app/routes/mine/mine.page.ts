import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mine',
  templateUrl: './mine.page.html',
  styleUrls: ['./mine.page.scss'],
})
export class MinePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  to_change() {
    this.router.navigateByUrl('change-mine');
  }
  to_user_agreement() {
    this.router.navigateByUrl('user-agreement-mine');
  }
  to_about_the_software() {
    this.router.navigateByUrl('about-the-software-mine');
  }
  to_setting() {
    this.router.navigateByUrl('setting-mine');
  }
  exit() {
    this.router.navigateByUrl('login');
  }
}
