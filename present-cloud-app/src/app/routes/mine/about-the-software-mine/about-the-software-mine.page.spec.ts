import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AboutTheSoftwareMinePage } from './about-the-software-mine.page';

describe('AboutTheSoftwareMinePage', () => {
  let component: AboutTheSoftwareMinePage;
  let fixture: ComponentFixture<AboutTheSoftwareMinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutTheSoftwareMinePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutTheSoftwareMinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
