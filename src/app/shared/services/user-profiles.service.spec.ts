import { TestBed } from '@angular/core/testing';

import { UserProfilesService } from './user-profiles.service';

describe('UserProfilesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserProfilesService = TestBed.inject(UserProfilesService);
    expect(service).toBeTruthy();
  });
});
