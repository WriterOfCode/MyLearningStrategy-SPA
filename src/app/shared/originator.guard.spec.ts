import { TestBed, async, inject } from '@angular/core/testing';

import { OriginatorGuard } from './originator.guard';

describe('OriginatorGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OriginatorGuard]
    });
  });

  it('should ...', inject([OriginatorGuard], (guard: OriginatorGuard) => {
    expect(guard).toBeTruthy();
  }));
});
