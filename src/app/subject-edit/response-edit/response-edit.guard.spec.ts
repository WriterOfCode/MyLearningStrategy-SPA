import { TestBed, waitForAsync, inject } from '@angular/core/testing';

import { ResponseEditGuard } from './response-edit.guard';

describe('ResponseEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResponseEditGuard]
    });
  });

  it('should ...', inject([ResponseEditGuard], (guard: ResponseEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
