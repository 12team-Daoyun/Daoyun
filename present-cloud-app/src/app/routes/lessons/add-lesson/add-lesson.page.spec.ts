import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddLessonPage } from './add-lesson.page';

describe('AddLessonPage', () => {
  let component: AddLessonPage;
  let fixture: ComponentFixture<AddLessonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLessonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddLessonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
