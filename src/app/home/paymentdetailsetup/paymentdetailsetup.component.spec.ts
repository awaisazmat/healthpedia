import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentdetailsetupComponent } from './paymentdetailsetup.component';

describe('PaymentdetailsetupComponent', () => {
  let component: PaymentdetailsetupComponent;
  let fixture: ComponentFixture<PaymentdetailsetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentdetailsetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentdetailsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
