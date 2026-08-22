import { TestBed } from '@angular/core/testing';

import { AdminReward } from './admin-reward';

describe('AdminReward', () => {
  let service: AdminReward;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminReward);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
