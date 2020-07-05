import { TestBed } from '@angular/core/testing';

import { LessonServiceService } from './lesson-service.service';

describe('LessonServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LessonServiceService = TestBed.get(LessonServiceService);
    expect(service).toBeTruthy();
  });
});
