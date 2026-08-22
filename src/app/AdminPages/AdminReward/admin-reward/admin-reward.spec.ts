import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReward } from './admin-reward';

describe('AdminReward', () => {
  let component: AdminReward;
  let fixture: ComponentFixture<AdminReward>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminReward],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminReward);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
