import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipEditorComponent } from './membership-editor.component';

describe('MembershipEditorComponent', () => {
  let component: MembershipEditorComponent;
  let fixture: ComponentFixture<MembershipEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
