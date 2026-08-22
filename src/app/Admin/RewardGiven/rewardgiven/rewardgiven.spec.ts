import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rewardgiven } from './rewardgiven';

describe('Rewardgiven', () => {
  let component: Rewardgiven;
  let fixture: ComponentFixture<Rewardgiven>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rewardgiven],
    }).compileComponents();

    fixture = TestBed.createComponent(Rewardgiven);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
