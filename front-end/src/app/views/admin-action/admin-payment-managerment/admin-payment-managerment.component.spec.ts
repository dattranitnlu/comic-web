import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPaymentManagermentComponent } from './admin-payment-managerment.component';

describe('AdminPaymentManagermentComponent', () => {
  let component: AdminPaymentManagermentComponent;
  let fixture: ComponentFixture<AdminPaymentManagermentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPaymentManagermentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPaymentManagermentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
