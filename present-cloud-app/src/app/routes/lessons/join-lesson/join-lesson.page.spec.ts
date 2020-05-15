import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JoinLessonPage } from './join-lesson.page';

describe('JoinLessonPage', () => {
  let component: JoinLessonPage;
  let fixture: ComponentFixture<JoinLessonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinLessonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JoinLessonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
