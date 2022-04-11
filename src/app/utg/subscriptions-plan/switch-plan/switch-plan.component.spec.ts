import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchPlanComponent } from './switch-plan.component';

describe('SwitchPlanComponent', () => {
  let component: SwitchPlanComponent;
  let fixture: ComponentFixture<SwitchPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
