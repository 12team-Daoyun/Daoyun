import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SettingMinePage } from './setting-mine.page';

describe('SettingMinePage', () => {
  let component: SettingMinePage;
  let fixture: ComponentFixture<SettingMinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingMinePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingMinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
