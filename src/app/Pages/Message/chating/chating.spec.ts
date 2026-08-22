import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Chating } from './chating';

describe('Chating', () => {
  let component: Chating;
  let fixture: ComponentFixture<Chating>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Chating],
    }).compileComponents();

    fixture = TestBed.createComponent(Chating);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
