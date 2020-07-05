import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-agreement-mine',
  templateUrl: './user-agreement-mine.page.html',
  styleUrls: ['./user-agreement-mine.page.scss'],
})
export class UserAgreementMinePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  goBack(){
    this.router.navigateByUrl('tabs/mine');
  }

}
