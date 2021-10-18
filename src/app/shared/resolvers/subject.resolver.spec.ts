import { TestBed } from '@angular/core/testing';
import { SubjectResolver } from './subject.resolver';

describe('SubjectResolver', () => {
  let resolver: SubjectResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SubjectResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
