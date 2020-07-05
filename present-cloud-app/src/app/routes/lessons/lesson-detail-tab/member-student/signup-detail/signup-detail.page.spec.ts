import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignupDetailPage } from './signup-detail.page';

describe('SignupDetailPage', () => {
  let component: SignupDetailPage;
  let fixture: ComponentFixture<SignupDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
