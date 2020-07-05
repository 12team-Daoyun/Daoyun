import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  goCurriculumCircle() {
    this.router.navigateByUrl('curriculumCirclePage');
  }
}
