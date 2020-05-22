import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangeMinePage } from './change-mine.page';

describe('ChangeMinePage', () => {
  let component: ChangeMinePage;
  let fixture: ComponentFixture<ChangeMinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeMinePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeMinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
