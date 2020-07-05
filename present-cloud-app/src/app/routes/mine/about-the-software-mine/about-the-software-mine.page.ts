import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-the-software-mine',
  templateUrl: './about-the-software-mine.page.html',
  styleUrls: ['./about-the-software-mine.page.scss'],
})
export class AboutTheSoftwareMinePage implements OnInit {
  
  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  goBack(){
    this.router.navigateByUrl('tabs/mine');
  }

}
