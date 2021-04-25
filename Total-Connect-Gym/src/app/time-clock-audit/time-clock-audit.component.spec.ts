import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeClockAuditComponent } from './time-clock-audit.component';

describe('TimeClockAuditComponent', () => {
  let component: TimeClockAuditComponent;
  let fixture: ComponentFixture<TimeClockAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeClockAuditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeClockAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
