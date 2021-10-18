import { TestBed } from '@angular/core/testing';

import { PickListsService } from './pick-lists.service';

describe('PickListsService', () => {
  let service: PickListsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PickListsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
