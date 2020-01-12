import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionHistoriesComponent } from './transaction-histories.component';

describe('TransactionHistoriesComponent', () => {
  let component: TransactionHistoriesComponent;
  let fixture: ComponentFixture<TransactionHistoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionHistoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionHistoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
