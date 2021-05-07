import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMembershipComponent } from './add-membership.component';

describe('AddMembershipComponent', () => {
  let component: AddMembershipComponent;
  let fixture: ComponentFixture<AddMembershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMembershipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
