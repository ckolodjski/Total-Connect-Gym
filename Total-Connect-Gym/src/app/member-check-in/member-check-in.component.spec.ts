import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberCheckInComponent } from './member-check-in.component';

describe('MemberCheckInComponent', () => {
  let component: MemberCheckInComponent;
  let fixture: ComponentFixture<MemberCheckInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberCheckInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberCheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
