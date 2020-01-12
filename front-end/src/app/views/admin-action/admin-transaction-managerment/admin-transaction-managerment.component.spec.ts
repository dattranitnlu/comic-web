import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTransactionManagermentComponent } from './admin-transaction-managerment.component';

describe('AdminTransactionManagermentComponent', () => {
  let component: AdminTransactionManagermentComponent;
  let fixture: ComponentFixture<AdminTransactionManagermentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTransactionManagermentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTransactionManagermentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
