import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectEditShellComponent } from './subject-edit-shell.component';

describe('SubjectEditShellComponent', () => {
  let component: SubjectEditShellComponent;
  let fixture: ComponentFixture<SubjectEditShellComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectEditShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectEditShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
