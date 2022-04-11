import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelSubscrptionComponent } from './cancel-subscrption.component';

describe('CancelSubscrptionComponent', () => {
  let component: CancelSubscrptionComponent;
  let fixture: ComponentFixture<CancelSubscrptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelSubscrptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelSubscrptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
