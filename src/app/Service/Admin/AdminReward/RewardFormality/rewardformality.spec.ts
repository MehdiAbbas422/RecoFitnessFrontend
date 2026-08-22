import { TestBed } from '@angular/core/testing';

import { Rewardformality } from './rewardformality';

describe('Rewardformality', () => {
  let service: Rewardformality;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Rewardformality);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
