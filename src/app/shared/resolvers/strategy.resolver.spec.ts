import { TestBed } from '@angular/core/testing';

import { StrategyResolver } from './strategy.resolver';

describe('StrategyResolver', () => {
  let resolver: StrategyResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(StrategyResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
