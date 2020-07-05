import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CurriculumCirclePage } from './curriculum-circle.page';

describe('CurriculumCirclePage', () => {
  let component: CurriculumCirclePage;
  let fixture: ComponentFixture<CurriculumCirclePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurriculumCirclePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CurriculumCirclePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
