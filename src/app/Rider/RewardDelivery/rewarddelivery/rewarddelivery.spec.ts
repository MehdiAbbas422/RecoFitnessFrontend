import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rewarddelivery } from './rewarddelivery';

describe('Rewarddelivery', () => {
  let component: Rewarddelivery;
  let fixture: ComponentFixture<Rewarddelivery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rewarddelivery],
    }).compileComponents();

    fixture = TestBed.createComponent(Rewarddelivery);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
