import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VersionSettingMinePage } from './version-setting-mine.page';

describe('VersionSettingMinePage', () => {
  let component: VersionSettingMinePage;
  let fixture: ComponentFixture<VersionSettingMinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersionSettingMinePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VersionSettingMinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
