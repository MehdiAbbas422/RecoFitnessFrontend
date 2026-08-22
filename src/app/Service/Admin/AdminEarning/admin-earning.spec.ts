import { TestBed } from '@angular/core/testing';

import { AdminEarning } from './admin-earning';

describe('AdminEarning', () => {
  let service: AdminEarning;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminEarning);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
