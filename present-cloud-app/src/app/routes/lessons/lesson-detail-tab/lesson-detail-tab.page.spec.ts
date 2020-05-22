import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LessonDetailTabPage } from './lesson-detail-tab.page';

describe('LessonDetailTabPage', () => {
  let component: LessonDetailTabPage;
  let fixture: ComponentFixture<LessonDetailTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonDetailTabPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LessonDetailTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
