import { TestBed } from '@angular/core/testing';

import { StrategiesService } from './strategies.service';

describe('StrategiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StrategiesService = TestBed.inject(StrategiesService);
    expect(service).toBeTruthy();
  });
});
