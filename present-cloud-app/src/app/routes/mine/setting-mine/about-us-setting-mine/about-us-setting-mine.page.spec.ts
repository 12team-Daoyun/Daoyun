import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AboutUsSettingMinePage } from './about-us-setting-mine.page';

describe('AboutUsSettingMinePage', () => {
  let component: AboutUsSettingMinePage;
  let fixture: ComponentFixture<AboutUsSettingMinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutUsSettingMinePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutUsSettingMinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
