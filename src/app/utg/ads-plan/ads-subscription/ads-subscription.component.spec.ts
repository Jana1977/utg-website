import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsSubscriptionComponent } from './ads-subscription.component';

describe('AdsSubscriptionComponent', () => {
  let component: AdsSubscriptionComponent;
  let fixture: ComponentFixture<AdsSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsSubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
