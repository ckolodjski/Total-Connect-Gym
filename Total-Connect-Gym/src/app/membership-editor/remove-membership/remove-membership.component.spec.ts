import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveMembershipComponent } from './remove-membership.component';

describe('RemoveMembershipComponent', () => {
  let component: RemoveMembershipComponent;
  let fixture: ComponentFixture<RemoveMembershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveMembershipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
