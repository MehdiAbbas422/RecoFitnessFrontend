import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Onlinepay } from './onlinepay';

describe('Onlinepay', () => {
  let component: Onlinepay;
  let fixture: ComponentFixture<Onlinepay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Onlinepay],
    }).compileComponents();

    fixture = TestBed.createComponent(Onlinepay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
