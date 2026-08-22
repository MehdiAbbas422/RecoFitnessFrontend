import { TestBed } from '@angular/core/testing';

import { AdminControl } from './admin-control';

describe('AdminControl', () => {
  let service: AdminControl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminControl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
