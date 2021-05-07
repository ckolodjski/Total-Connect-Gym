import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymClassEditorComponent } from './gym-class-editor.component';

describe('GymClassEditorComponent', () => {
  let component: GymClassEditorComponent;
  let fixture: ComponentFixture<GymClassEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GymClassEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GymClassEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
