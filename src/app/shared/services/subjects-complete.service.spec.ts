import { TestBed } from '@angular/core/testing';

import { SubjectsCompleteService } from './subjects-complete.service';

describe('SubjectsCompleteService', () => {
  let service: SubjectsCompleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectsCompleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
