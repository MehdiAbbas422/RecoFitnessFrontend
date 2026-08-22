import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Deliverycompleted } from './deliverycompleted';

describe('Deliverycompleted', () => {
  let component: Deliverycompleted;
  let fixture: ComponentFixture<Deliverycompleted>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Deliverycompleted],
    }).compileComponents();

    fixture = TestBed.createComponent(Deliverycompleted);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
