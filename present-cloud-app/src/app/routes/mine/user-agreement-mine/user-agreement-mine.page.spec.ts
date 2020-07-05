import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserAgreementMinePage } from './user-agreement-mine.page';

describe('UserAgreementMinePage', () => {
  let component: UserAgreementMinePage;
  let fixture: ComponentFixture<UserAgreementMinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAgreementMinePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserAgreementMinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
