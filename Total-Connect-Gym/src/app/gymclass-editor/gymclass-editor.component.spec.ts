import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymclassEditorComponent } from './gymclass-editor.component';

describe('GymclassEditorComponent', () => {
  let component: GymclassEditorComponent;
  let fixture: ComponentFixture<GymclassEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GymclassEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GymclassEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
