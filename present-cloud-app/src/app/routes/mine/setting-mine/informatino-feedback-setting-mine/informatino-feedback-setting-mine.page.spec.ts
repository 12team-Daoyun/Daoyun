import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InformatinoFeedbackSettingMinePage } from './informatino-feedback-setting-mine.page';

describe('InformatinoFeedbackSettingMinePage', () => {
  let component: InformatinoFeedbackSettingMinePage;
  let fixture: ComponentFixture<InformatinoFeedbackSettingMinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformatinoFeedbackSettingMinePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InformatinoFeedbackSettingMinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
