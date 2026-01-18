import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartService } from './cart';

describe('Cart', () => {
  let component: CartService;
  let fixture: ComponentFixture<CartService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartService);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
