import { TestBed, async, inject } from '@angular/core/testing';

import { QuestionEditGuard } from './question-edit.guard';

describe('QuestionEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionEditGuard]
    });
  });

  it('should ...', inject([QuestionEditGuard], (guard: QuestionEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
