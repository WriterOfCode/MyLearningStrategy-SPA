import { TestBed } from '@angular/core/testing';

import { ResponsesListResolver } from './responses.resolver';

describe('ResponsesResolver', () => {
  let resolver: ResponsesListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ResponsesListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
