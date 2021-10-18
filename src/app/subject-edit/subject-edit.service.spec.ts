import { TestBed } from '@angular/core/testing';

import { SubjectEditService } from './subject-edit.service';

describe('SubjectEditService', () => {
  let service: SubjectEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
});
