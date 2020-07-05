import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MemberStudentPage } from './member-student.page';

describe('MemberStudentPage', () => {
  let component: MemberStudentPage;
  let fixture: ComponentFixture<MemberStudentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberStudentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MemberStudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
