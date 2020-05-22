import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us-setting-mine',
  templateUrl: './about-us-setting-mine.page.html',
  styleUrls: ['./about-us-setting-mine.page.scss'],
})
export class AboutUsSettingMinePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goBack(){
    this.router.navigateByUrl('setting-mine');
  }

}
