import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-version-setting-mine',
  templateUrl: './version-setting-mine.page.html',
  styleUrls: ['./version-setting-mine.page.scss'],
})
export class VersionSettingMinePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goBack(){
    this.router.navigateByUrl('setting-mine');
  }

}
