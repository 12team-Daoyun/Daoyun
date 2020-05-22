import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ValidateLoginPage } from './validate-login.page';

describe('ValidateLoginPage', () => {
  let component: ValidateLoginPage;
  let fixture: ComponentFixture<ValidateLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateLoginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ValidateLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
