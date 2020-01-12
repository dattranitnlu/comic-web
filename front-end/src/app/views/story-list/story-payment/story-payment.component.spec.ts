import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryPaymentComponent } from './story-payment.component';

describe('StoryPaymentComponent', () => {
  let component: StoryPaymentComponent;
  let fixture: ComponentFixture<StoryPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
